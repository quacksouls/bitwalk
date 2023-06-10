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

import { bool_t } from "/quack/lib/constant/bool.js";
import { wse_t } from "/quack/lib/constant/wse.js";
import { log } from "/quack/lib/log.js";
import {
    can_short,
    initial_portfolio,
    transaction,
    update_history,
} from "/quack/lib/wse.js";

/**
 * Suppress various log messages.
 *
 * @param {NS} ns The Netscript API.
 */
function shush(ns) {
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");
}

/**
 * A Stock Market script that does not have access to 4S data and API.  We have
 * an account at the World Stock Exchange and access to the Trade Information
 * eXchange (TIX) API.
 *
 * Usage: run quack/stock/pre4s.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    shush(ns);

    // Continuously trade on the Stock Market.
    const allow_short = can_short(ns);
    log(ns, "Trading on the Stock Market, pre-4S");
    let portfolio = await initial_portfolio(ns, bool_t.NO_4S);
    for (;;) {
        await ns.sleep(wse_t.TICK);
        portfolio = update_history(ns, portfolio);
        portfolio = await transaction(ns, portfolio, bool_t.NO_4S, allow_short);
    }
}
