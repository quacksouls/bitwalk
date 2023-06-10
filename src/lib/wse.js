/**
 * Copyright (C) 2023 Duck McSouls
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/// ///////////////////////////////////////////////////////////////////////
// Miscellaneous helper functions for the Stock Market.
/// ///////////////////////////////////////////////////////////////////////

import { MyArray } from "/quack/lib/array.js";
import { bool_t } from "/quack/lib/constant/bool.js";
import { string_t } from "/quack/lib/constant/string.js";
import { time_t } from "/quack/lib/constant/time.js";
import { wse_t } from "/quack/lib/constant/wse.js";
import { log } from "/quack/lib/log.js";
import { money, Money } from "/quack/lib/money.js";
import { MyNumber } from "/quack/lib/number.js";
import { MyString } from "/quack/lib/string.js";
import { assert, is_boolean } from "/quack/lib/util.js";

/**
 * How many shares are available to be purchased.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} sym A stock symbol.
 * @returns {number} The number of shares of the given stock available to be
 *     purchased.
 */
function available_shares(ns, sym) {
    const max_shares = ns.stock.getMaxShares(sym);
    return max_shares - num_long(ns, sym) - num_short(ns, sym);
}

/**
 * Purchase shares of the top stocks most likely to increase in value during the
 * next tick.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {string} position The position we want to buy.
 * @returns {object} The updated portfolio.
 */
function buy_stock(ns, portfolio, position) {
    assert(is_valid_position(position));

    let stock = most_favourable(ns, portfolio);
    if (position === wse_t.position.SHORT) {
        stock = least_favourable(ns, portfolio);
    }
    if (MyArray.is_empty(stock)) {
        return portfolio;
    }

    const new_portfolio = { ...portfolio };
    for (const sym of stock) {
        const nshare = num_shares(ns, sym, new_portfolio, position);
        if (nshare < 1) {
            continue;
        }

        // Try to buy the given number of shares.
        let cost_per_share = 0;
        if (position === wse_t.position.LONG) {
            cost_per_share = ns.stock.buyStock(sym, nshare);
        } else {
            cost_per_share = ns.stock.buyShort(sym, nshare);
        }
        if (cost_per_share === 0) {
            continue;
        }

        // Update the cost and commission.
        if (position === wse_t.position.LONG) {
            new_portfolio[sym].cost_long += nshare * cost_per_share;
            new_portfolio[sym].commission_long += wse_t.COMMISSION;
        } else {
            new_portfolio[sym].cost_short += nshare * cost_per_share;
            new_portfolio[sym].commission_short += wse_t.COMMISSION;
        }
    }

    return new_portfolio;
}

/**
 * Whether we can short stocks.
 *
 * @param {NS} ns The Netscript API.
 * @returns {boolean} True if we can short stocks; false otherwise.
 */
export function can_short(ns) {
    try {
        ns.stock.buyShort(wse_t.stock.FSIG, 0);
        return bool_t.SUCCESS;
    } catch {
        return bool_t.FAILURE;
    }
}

/**
 * The amount of money we can use to purchase shares of a stock.  This takes
 * into account the money that should be held in reserve.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our stock portfolio.
 * @returns {number} The funds for buying shares.
 */
function expenditure(ns, portfolio) {
    const excess_money = money(ns) - portfolio.reserve;
    const fraction = wse_t.reserve.BUY_MULT;
    return Math.floor(fraction * excess_money) - wse_t.COMMISSION;
}

/**
 * The forecast for each stock.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our stock portfolio.
 * @param {boolean} fourS Whether we have access to 4S data and API.
 * @returns {object} The same portfolio, but with the forecast for each stock.
 */
function get_forecast(ns, portfolio, fourS) {
    assert(is_boolean(fourS));
    const new_portfolio = { ...portfolio };
    if (fourS) {
        ns.stock.getSymbols().forEach((sym) => {
            new_portfolio[sym].forecast = ns.stock.getForecast(sym);
        });
    } else {
        const sum = (sym) => MyArray.sum(new_portfolio[sym].history);
        const stock_forecast = (sym) => sum(sym) / wse_t.SAMPLE_LENGTH;
        ns.stock.getSymbols().forEach((sym) => {
            new_portfolio[sym].forecast = stock_forecast(sym);
        });
    }
    return new_portfolio;
}

/**
 * Whether we have access to 4S data and API.
 *
 * @param {NS} ns The Netscript API.
 * @returns {boolean} True if we have access to 4S data and API;
 *     false otherwise.
 */
export function has_4s_api(ns) {
    if (!ns.stock.purchase4SMarketData()) {
        return bool_t.FAILURE;
    }
    if (!ns.stock.purchase4SMarketDataTixApi()) {
        return bool_t.FAILURE;
    }
    return bool_t.SUCCESS;
}

/**
 * Whether we have access to pre-4S data and API.
 *
 * @param {NS} ns The Netscript API.
 * @returns {boolean} True if we have access to pre-4S data and API;
 *     false otherwise.
 */
export function has_pre4s_api(ns) {
    if (!ns.stock.purchaseWseAccount()) {
        return bool_t.FAILURE;
    }
    if (!ns.stock.purchaseTixApi()) {
        return bool_t.FAILURE;
    }
    return bool_t.SUCCESS;
}

/**
 * Whether we have enough money to be held in reserve.  Must have at least a
 * certain amount of money before we start dabbling on the Stock Market.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @returns {boolean} True if we have sufficient money to be held in reserve;
 *     false otherwise.
 */
function has_money_reserve(ns, portfolio) {
    return money(ns) > portfolio.reserve;
}

/**
 * The default portfolio of stocks.
 *
 * @param {NS} ns The Netscript API.
 * @param {boolean} fourS Whether we have access to the 4S data and API.
 * @returns {Promise<object>} An object representing the initial portfolio of
 *     stocks.  The object is structured as follows:
 *     {
 *         reserve: number, // The amount of money to be held in reserve.
 *         symbol1: {
 *             cost_long: number, // Total cost of buying all shares in Long.
 *             cost_short: number, // Total cost of buying all shares in Short.
 *             commission_long: number, // Commission for all shares in Long.
 *             commission_short: number, // Commission for all shares in Short.
 *             forecast: number, // The forecast for the stock.
 *             history: array<number>, // History of price changes.  Latest
 *                                     // value at front of array.  Pre-4S only.
 *             prev_price: number, // Previous price of the stock.  Pre-4S only.
 *         },
 *         ...
 *     }
 */
export async function initial_portfolio(ns, fourS) {
    assert(is_boolean(fourS));
    const portfolio = {
        /**
         * The initial amount of money to be held in reserve.  Will increase as
         * we make a profit from selling shares of a stock.
         */
        reserve: wse_t.reserve.INIT,
    };
    const add_stock_data = (sym) => {
        portfolio[sym] = {
            cost_long: 0,
            cost_short: 0,
            commission_long: 0,
            commission_short: 0,
            forecast: 0,
            history: [],
            prev_price: 0,
        };
    };
    ns.stock.getSymbols().forEach(add_stock_data);
    return fourS ? portfolio : populate_history(ns, portfolio);
}

/**
 * Whether the forecast is favourable for the Long position of a stock.  If the
 * forecast for a stock exceeds a given threshold, then the value of the stock
 * is expected to increase in the next tick (or cycle) of the Stock Market.  In
 * this case, we say that the forecast is favourable for the Long position.
 * However, if the forecast for the stock is at most the threshold, then the
 * value of the stock is expected to decrease in the next tick.  Hence the
 * forecast is unfavourable for the Long position.
 *
 * @param {object} portfolio Our portfolio of stocks.
 * @param {string} sym The symbol of a stock.
 * @returns {boolean} True if the forecast is favourable for the given stock in
 *     the Long position; false otherwise.
 */
function is_favourable_long(portfolio, sym) {
    return portfolio[sym].forecast > wse_t.forecast.SELL_TAU;
}

/**
 * Whether this is a valid position for a stock.
 *
 * @param {string} position A position of a stock.
 * @returns {boolean} True if the given position is supported; false otherwise.
 */
function is_valid_position(position) {
    assert(!MyString.is_empty(position));
    return (
        position === wse_t.position.LONG || position === wse_t.position.SHORT
    );
}

/**
 * The top stocks most likely to decrease in value during the next tick.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @returns {array<string>} The top stocks that are forecasted to have the
 *     lowest chances of increase in the next tick.  Empty array if no stocks
 *     are forecasted to decrease in value.
 */
function least_favourable(ns, portfolio) {
    // Sort the stocks in increasing order of their chances of increase.
    // eslint-disable-next-line max-len
    const not_favourable = (sym) => portfolio[sym].forecast < wse_t.forecast.SELL_TAU;
    const to_int = (n) => Math.floor(1e6 * n);
    const projection = (sym) => to_int(portfolio[sym].forecast);
    const ascending = (syma, symb) => projection(syma) - projection(symb);
    let stock = ns.stock.getSymbols().filter(not_favourable);
    stock.sort(ascending);

    const can_buy = (sym) => available_shares(ns, sym) > 0;
    stock = stock.filter(can_buy);
    return MyArray.is_empty(stock) ? [] : stock.slice(0, wse_t.NUM_BUY);
}

/**
 * The top stocks most likely to increase in value during the next tick.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @returns {array<string>} The top stocks that are forecasted to have the best
 *     chances of increase in the next tick.  Empty array if no stocks are
 *     forecasted to increase in value.
 */
function most_favourable(ns, portfolio) {
    // Sort the stocks in descending order of their chances of increase.
    // eslint-disable-next-line max-len
    const is_favourable = (sym) => portfolio[sym].forecast > wse_t.forecast.BUY_TAU;
    const to_int = (n) => Math.floor(1e6 * n);
    const projection = (sym) => to_int(portfolio[sym].forecast);
    const descending = (syma, symb) => projection(symb) - projection(syma);
    let stock = ns.stock.getSymbols().filter(is_favourable);
    stock.sort(descending);

    const can_buy = (sym) => available_shares(ns, sym) > 0;
    stock = stock.filter(can_buy);
    return MyArray.is_empty(stock) ? [] : stock.slice(0, wse_t.NUM_BUY);
}

/**
 * The number of shares we own in the Long position.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} sym A stock symbol.
 * @returns {number} How many shares we have of the given stock in the Long
 *     position.
 */
export function num_long(ns, sym) {
    return ns.stock.getPosition(sym)[wse_t.LONG_INDEX];
}

/**
 * How many shares of a stock we can purchase.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} sym Buy shares of this stock.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {string} position The position of the stock.
 * @returns {number} The number of shares of this stock we can buy, in the given
 *     position.  Must be at least zero.  If 0, then we cannot buy any shares of
 *     the given stock.
 */
function num_shares(ns, sym, portfolio, position) {
    // Sanity checks.
    assert(is_valid_position(position));
    if (!has_money_reserve(ns, portfolio)) {
        return 0;
    }
    const funds = expenditure(ns, portfolio);
    if (funds < wse_t.SPEND_TAU) {
        return 0;
    }

    // The maximum number of shares of the stock we can buy.  This takes into
    // account the number of shares we already own.
    const max_share = available_shares(ns, sym);
    if (max_share < 1) {
        return 0;
    }

    // How many more shares of the stock we can buy.
    let nshare = Math.floor(funds / ns.stock.getAskPrice(sym));
    if (position === wse_t.position.SHORT) {
        nshare = Math.floor(funds / ns.stock.getBidPrice(sym));
    }
    return Math.min(nshare, max_share);
}

/**
 * The number of shares we own in the Short position.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} sym A stock symbol.
 * @returns {number} How many shares we have of the given stock in the Short
 *     position.
 */
export function num_short(ns, sym) {
    return ns.stock.getPosition(sym)[wse_t.SHORT_INDEX];
}

/**
 * Pre-4S only.  The initial price history of each stock.  We need a sample of
 * the recent price changes of each stock.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @returns {Promise<object>} The same portfolio, but with a sample of the
 *     recent price changes of each stock.
 */
async function populate_history(ns, portfolio) {
    // The initial price of each stock.
    let new_portfolio = { ...portfolio };
    const set_init_price = (sym) => {
        new_portfolio[sym].prev_price = ns.stock.getPrice(sym);
    };
    ns.stock.getSymbols().forEach(set_init_price);

    // A sample of the price changes.
    for (let i = 0; i < wse_t.SAMPLE_LENGTH; i++) {
        await ns.sleep(wse_t.TICK);
        new_portfolio = update_history(ns, new_portfolio);
    }
    return new_portfolio;
}

/**
 * The amount of profit to add to our reserve.  The rest can be used to purchase
 * shares of stocks.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {number} profit The profit from selling shares of a stock.
 * @returns {Promise<number>} How much of the profit to keep.
 */
async function profit_to_keep(ns, portfolio, profit) {
    const new_money = money(ns) + profit;

    // Given the fraction of the profit we should keep in reserve, do we have
    // enough funds to purchase shares of a stock?
    const has_funds = (keep_amount) => {
        const new_reserve = portfolio.reserve + keep_amount;
        const excess_money = new_money - new_reserve;
        const funds = Math.floor(wse_t.reserve.BUY_MULT * excess_money);
        return funds >= wse_t.SPEND_TAU;
    };

    // Determine how much of the profit we can keep.
    let keep_mult = wse_t.reserve.MAX_KEEP_MULT;
    let keep = Math.floor(keep_mult * profit);
    while (!has_funds(keep)) {
        keep_mult -= wse_t.reserve.KEEP_DELTA;
        if (keep_mult <= 0) {
            keep = 0;
            break;
        }
        keep = Math.floor(keep_mult * profit);
        await ns.sleep(time_t.MILLISECOND);
    }
    return keep < 0 ? 0 : keep;
}

/**
 * Choose the stock to sell.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {string} position Either Long or Short.
 * @returns {string} The symbol of the stock to sell in the given position.
 *     Empty string if no stocks should be sold.
 */
function sell_candidate(ns, portfolio, position) {
    assert(is_valid_position(position));

    let has_shares = null;
    let favourable = null;
    if (position === wse_t.position.LONG) {
        // All stocks that do not have favourable forecast.  The propitious time
        // to sell shares of a stock in the Long position is when the forecast
        // tells us the stock would decrease in the next tick.
        has_shares = (sym) => num_long(ns, sym) > 0;
        favourable = (sym) => !is_favourable_long(portfolio, sym);
    } else {
        // All stocks having favourable forecast.  When shorting a stock, we are
        //  betting that the stock would increase in the next tick.  The
        // propitious time to sell shares of a stock in the Short position is
        // when the forecast tells us the stock would increase in the next tick.
        has_shares = (sym) => num_short(ns, sym) > 0;
        favourable = (sym) => is_favourable_long(portfolio, sym);
    }

    const stock = ns.stock.getSymbols().filter(has_shares).filter(favourable);

    // Choose the stock that yields the highest profit.
    const profit = (sym) => sell_profit(ns, sym, portfolio, position);
    const can_profit = (sym) => profit(sym) > 0;
    const descending = (syma, symb) => profit(symb) - profit(syma);
    const candidate = stock.filter(can_profit);
    candidate.sort(descending);
    return MyArray.is_empty(candidate) ? string_t.EMPTY : candidate[0];
}

/**
 * The profit we make from selling all shares of a stock.  This takes into
 * account the total cost we have paid for shares of the stock, as well as the
 * total commission we have paid and will pay for the sell transaction.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} sym Sell all shares of this stock.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {string} position The position of the given stock.
 * @returns {number} The profit from selling all shares of the stock in the
 *     given position.
 */
function sell_profit(ns, sym, portfolio, position) {
    return (
        sell_revenue(ns, sym, position)
        - total_fees(sym, portfolio, position)
        - total_cost(sym, portfolio, position)
    );
}

/**
 * The revenue from selling all shares of a stock in a given position.  Revenue
 * is not the same as profit.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} sym Sell all shares of this stock.
 * @param {string} position The position of the given stock.
 * @returns {number} The revenue from selling all shares of the stock in the
 *     given position.
 */
function sell_revenue(ns, sym, position) {
    assert(is_valid_position(position));
    if (position === wse_t.position.LONG) {
        return num_long(ns, sym) * ns.stock.getBidPrice(sym);
    }
    return num_short(ns, sym) * ns.stock.getAskPrice(sym);
}

/**
 * Sell shares of a stock.  Only sell if doing so would earn us a profit.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {boolean} allow_short Whether we can short stocks.
 * @returns {Promise<object>} The updated portfolio.
 */
async function sell_stock(ns, portfolio, allow_short) {
    assert(is_boolean(allow_short));
    let new_portfolio = await sell_stock_long(ns, portfolio);
    if (allow_short) {
        new_portfolio = await sell_stock_short(ns, new_portfolio);
    }
    return new_portfolio;
}

/**
 * Sell all shares of a stock in the Long position.  Only sell if doing so would
 * earn us a profit.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @returns {Promise<object>} The updated portfolio.
 */
async function sell_stock_long(ns, portfolio) {
    const new_portfolio = { ...portfolio };
    const sym = sell_candidate(ns, new_portfolio, wse_t.position.LONG);
    if (MyString.is_empty(sym)) {
        return portfolio;
    }

    const profit = sell_profit(ns, sym, new_portfolio, wse_t.position.LONG);
    const nshare = num_long(ns, sym);
    const result = ns.stock.sellStock(sym, nshare);
    assert(result !== 0);
    const keep = await profit_to_keep(ns, new_portfolio, profit);
    new_portfolio.reserve += keep;
    new_portfolio[sym].cost_long = 0;
    new_portfolio[sym].commission_long = 0;
    const prefix = `Sold ${MyNumber.format(nshare)} share(s) of ${sym} (Long)`;
    const suffix = `for ${Money.format(profit)} in profit`;
    log(ns, `${prefix} ${suffix}`);
    ns.printf(`Reserve: ${Money.format(new_portfolio.reserve)}`);
    return new_portfolio;
}

/**
 * Sell all shares of a stock in the Short position.  Only sell if doing so
 * would earn us a profit.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @returns {Promise<object>} The updated portfolio.
 */
async function sell_stock_short(ns, portfolio) {
    const new_portfolio = { ...portfolio };
    const sym = sell_candidate(ns, new_portfolio, wse_t.position.SHORT);
    if (MyString.is_empty(sym)) {
        return portfolio;
    }

    const profit = sell_profit(ns, sym, new_portfolio, wse_t.position.SHORT);
    const nshare = num_short(ns, sym);
    const result = ns.stock.sellShort(sym, nshare);
    assert(result !== 0);
    const keep = await profit_to_keep(ns, new_portfolio, profit);
    new_portfolio.reserve += keep;
    new_portfolio[sym].cost_short = 0;
    new_portfolio[sym].commission_short = 0;
    const prefix = `Sold ${MyNumber.format(nshare)} share(s) of ${sym} (Short)`;
    const suffix = `for ${Money.format(profit)} in profit`;
    log(ns, `${prefix} ${suffix}`);
    ns.printf(`Reserve: ${Money.format(new_portfolio.reserve)}`);
    return new_portfolio;
}

/**
 * The total cost of a stock in a given position.  Does not include commission.
 *
 * @param {string} sym A stock symbol.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {string} position A position of the stock.
 * @returns {number} The total cost of the stock in the given position.
 */
function total_cost(sym, portfolio, position) {
    assert(is_valid_position(position));
    if (position === wse_t.position.LONG) {
        return portfolio[sym].cost_long;
    }
    return portfolio[sym].cost_short;
}

/**
 * The total commission incurred when we want to sell all shares of a stock.
 *
 * @param {string} sym Sell all shares of this stock.
 * @param {object} portfolio Our stock portfolio.
 * @param {string} position The position of the given stock.
 * @returns {number} The total commission from selling all shares of the stock
 *     in the given position.
 */
function total_fees(sym, portfolio, position) {
    assert(is_valid_position(position));
    if (position === wse_t.position.LONG) {
        return wse_t.COMMISSION + portfolio[sym].commission_long;
    }
    return wse_t.COMMISSION + portfolio[sym].commission_short;
}

/**
 * Sell or buy shares of stocks.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @param {boolean} fourS Whether we have access to the 4S data and API.
 * @param {boolean} allow_short Whether we can short stocks.
 * @returns {object} The updated portfolio.
 */
export async function transaction(ns, portfolio, fourS, allow_short) {
    assert(is_boolean(fourS));
    assert(is_boolean(allow_short));
    let new_portfolio = get_forecast(ns, portfolio, fourS);
    new_portfolio = await sell_stock(ns, new_portfolio, allow_short);
    new_portfolio = buy_stock(ns, new_portfolio, wse_t.position.LONG);
    if (allow_short) {
        new_portfolio = buy_stock(ns, new_portfolio, wse_t.position.SHORT);
    }
    return new_portfolio;
}

/**
 * Pre-4S only.  Update the history of price changes of stocks.
 *
 * @param {NS} ns The Netscript API.
 * @param {object} portfolio Our portfolio of stocks.
 * @returns {object} The same portfolio, but with the latest change in price.
 */
export function update_history(ns, portfolio) {
    const new_portfolio = { ...portfolio };
    const to_binary = (ratio) => (ratio > 1 ? 1 : 0);
    const update_price = (sym) => {
        const current_price = ns.stock.getPrice(sym);
        const ratio = current_price / new_portfolio[sym].prev_price;

        // The latest is always at the front of the array.  The previous value
        // is now at index 1 of the array, etc.  The oldest value is at the end
        // of the array.
        new_portfolio[sym].history.unshift(to_binary(ratio));
        if (new_portfolio[sym].history.length > wse_t.SAMPLE_LENGTH) {
            new_portfolio[sym].history.pop();
        }
        new_portfolio[sym].prev_price = current_price;
    };
    ns.stock.getSymbols().forEach(update_price);
    return new_portfolio;
}
