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

import { MyArray } from "/quack/lib/array.js";
import { hgw_t } from "/quack/lib/constant/hgw.js";
import { pserv_t } from "/quack/lib/constant/pserv.js";
import { script_t } from "/quack/lib/constant/script.js";
import { server_t } from "/quack/lib/constant/server.js";
import { string_t } from "/quack/lib/constant/string.js";
import { darkweb_t } from "/quack/lib/constant/tor.js";
import { has_formulas } from "/quack/lib/exe.js";
import { find_candidates } from "/quack/lib/hgw.js";
import { error } from "/quack/lib/log.js";
import { money } from "/quack/lib/money.js";
import { PurchasedServer } from "/quack/lib/pserv.js";
import { can_run_script } from "/quack/lib/server.js";
import { MyString } from "/quack/lib/string.js";

/**
 * Purchase a server.
 *
 * @param {NS} ns The Netscript API.
 */
function buy_server(ns) {
    // Sanity checks.
    const pserv = new PurchasedServer(ns);
    const cost = pserv.cost(pserv_t.ram.DEFAULT);
    if (
        !can_run_script(ns, script_t.BATCHER, server_t.HOME)
        || pserv.has_max()
        || money(ns) < cost
    ) {
        return;
    }

    // Purchase a server and launch a batcher on it.
    const target = find_target(ns);
    if (MyString.is_empty(target)) {
        return;
    }
    const host = pserv.purchase(pserv_t.PREFIX, pserv_t.ram.DEFAULT);
    const option = { preventDuplicates: true, threads: 1 };
    ns.exec(script_t.BATCHER, server_t.HOME, option, host, target);
}

/**
 * Choose a world server to target.
 *
 * @param {NS} ns The Netscript API.
 * @returns {string} Hostname of a world server to target.  Empty string if no
 *     suitable target can be found.
 */
function find_target(ns) {
    let candidate = find_candidates(ns);

    // All servers being targeted right now.
    const current_target = (host) => {
        // The world server that this purchased server is targeting.
        // eslint-disable-next-line max-len
        const is_running = (target) => ns.isRunning(script_t.BATCHER, server_t.HOME, host, target);
        return candidate.find(is_running);
    };
    const targets = ns.getPurchasedServers().map(current_target);

    const not_target = (host) => !targets.includes(host);
    candidate = candidate.filter(not_target);
    return MyArray.is_empty(candidate) ? string_t.EMPTY : candidate[0];
}

/**
 * Suppress various log messages.
 *
 * @param {NS} ns The Netscript API.
 */
function shush(ns) {
    ns.disableLog("getHackingLevel");
    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("scan");
    ns.disableLog("sleep");
}

/**
 * Purchase and update our farm of servers.
 *
 * @param {NS} ns The Netscript API.
 */
function update(ns) {
    buy_server(ns);
    upgrade_server(ns);
}

/**
 * Upgrade the RAM of an existing purchased server.
 *
 * @param {NS} ns The Netscript API.
 */
function upgrade_server(ns) {
    const pserv = new PurchasedServer(ns);
    const can_upgrade = (host) => pserv.max_ram(host) < hgw_t.PSERV_MAX_RAM;
    const upgrade_ram = (host) => pserv.upgrade(host, 2 * pserv.max_ram(host));
    pserv.farm().filter(can_upgrade).forEach(upgrade_ram);
}

/**
 * WARNING: Requires the program Formulas.exe.
 *
 * Manage a farm of purchased servers, each running a parallel batcher.  Like
 * AWS cloud computing.
 *
 * Usage: run quack/hgw/batcher/cloud.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    shush(ns);
    if (!has_formulas(ns)) {
        error(ns, `${darkweb_t.program.FORMULAS} not found`);
        return;
    }

    for (;;) {
        update(ns);
        await ns.sleep(pserv_t.TICK);
    }
}
