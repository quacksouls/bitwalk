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
import { can_short, initial_portfolio, transaction } from "/quack/lib/wse.js";

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
 * WARNING: Requires access to all Stock Market APIs and data.
 *
 * Automate our trading on the World Stock Exchange.
 *
 * Usage: run quack/stock/trade.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    shush(ns);

    // Continuously trade on the Stock Market.
    const allow_short = can_short(ns);
    log(ns, "Trading on the Stock Market");
    let portfolio = await initial_portfolio(ns, bool_t.HAS_4S);
    for (;;) {
        portfolio = await transaction(
            ns,
            portfolio,
            bool_t.HAS_4S,
            allow_short
        );
        await ns.sleep(wse_t.TICK);
    }
}
