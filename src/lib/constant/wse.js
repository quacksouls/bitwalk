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
// A bunch of constant values related to the World Stock Exchange.
/// ///////////////////////////////////////////////////////////////////////

export const wse_t = {
    /**
     * The amount of money paid in commission for each market transaction.
     */
    COMMISSION: 100e3,
    forecast: {
        /**
         * A threshold to help us decide whether to buy shares of a stock.  If
         * the forecast is above this threshold, we should buy shares of the
         * stock.
         */
        BUY_TAU: 0.525,
        /**
         * A threshold to help us decide whether to sell shares of a stock.  If
         * the forecast of a stock exceeds this threshold, then we should hold
         * on to shares of the stock.  On the other hand, if the forecast is at
         * most this threshold, we should sell shares of the stock.
         */
        SELL_TAU: 0.5,
    },
    /**
     * The index in the array returned by ns.stock.getPosition() where we find
     * the number of shares we own in the Long position.
     */
    LONG_INDEX: 0,
    /**
     * During any tick, buy shares of at most this many stocks.
     */
    NUM_BUY: 3,
    /**
     * Positions for a stock.
     */
    position: {
        LONG: "Long",
        SHORT: "Short",
    },
    /**
     * Various constants related to the amount of money to be held in reserve.
     */
    reserve: {
        /**
         * Spend this fraction of money to buy shares.  Our funds is defined as
         *
         * funds = current money - reserve money
         *
         * We want to spend (MULT * funds) to purchase shares.
         */
        BUY_MULT: 0.025,
        /**
         * The initial amount of money to be held in reserve.  Will increase as
         * we make a profit from selling shares of a stock.
         */
        INIT: 0,
        /**
         * Lower the keep fraction by this amount.
         */
        KEEP_DELTA: 0.01,
        /**
         * The maximum fraction of profit to add to our reserve.  If we cannot
         * add this fraction of the profit to our reserve, we lower the keep
         * fraction by KEEP_DELTA.
         */
        MAX_KEEP_MULT: 0.1,
    },
    /**
     * Get this many samples of price changes.  Always keep this many recent
     * samples.
     */
    SAMPLE_LENGTH: 14,
    /**
     * The index in the array returned by ns.stock.getPosition() where we find
     * the number of shares we own in the Short position.
     */
    SHORT_INDEX: 2,
    /**
     * The minimum amount of money we are willing to spend to purchase shares
     * of a stock.  This is our spending threshold.
     */
    SPEND_TAU: 5e6,
    /**
     * Stock symbols.
     */
    stock: {
        FSIG: "FSIG",
    },
    /**
     * The Stock Market updates approximately every 6 seconds.
     */
    TICK: 6e3,
};
