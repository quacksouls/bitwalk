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

import { script_t } from "/quack/lib/constant/script.js";
import { server_t } from "/quack/lib/constant/server.js";
import { wse_t } from "/quack/lib/constant/wse.js";
import { has_4s_api, has_pre4s_api } from "/quack/lib/wse.js";

/**
 * Suppress various log messages.
 *
 * @param {NS} ns The Netscript API.
 */
function shush(ns) {
    ns.disableLog("sleep");
    ns.disableLog("getServerMoneyAvailable");
}

/**
 * Purchase access to all Stock Market APIs and data.  We require the APIs and
 * data before we can launch our trade bot.
 *
 * Usage: run quack/stock/go.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    shush(ns);

    while (!has_pre4s_api(ns)) {
        await ns.sleep(wse_t.TICK);
    }
    const option = { preventDuplicates: true, threads: 1 };
    const pid = ns.exec(script_t.stock.PRE4S, server_t.HOME, option);

    while (!has_4s_api(ns)) {
        await ns.sleep(wse_t.TICK);
    }
    ns.kill(pid);
    ns.exec(script_t.stock.POST4S, server_t.HOME, option);
}
