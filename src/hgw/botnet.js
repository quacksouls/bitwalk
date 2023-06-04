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
import { script_t } from "/quack/lib/constant/script.js";
import { find_candidates } from "/quack/lib/hgw.js";
import { nuke_servers } from "/quack/lib/network.js";
import { Server } from "/quack/lib/server.js";
import { assert } from "/quack/lib/util.js";

/**
 * Assemble a botnet and use it to hack a common target.
 *
 * @param {NS} ns The Netscript API.
 */
function attack(ns) {
    const target = best_target(ns);
    nuke_servers(ns).forEach((host) => {
        const server = new Server(ns, host);
        server.deploy(script_t.EARLY_HACK, target);
    });
}

/**
 * The best server to hack.  This takes into account our current Hack stat.
 *
 * @param {NS} ns The Netscript API.
 * @returns {string} Hostname of a server.
 */
function best_target(ns) {
    const candidate = find_candidates(ns);
    assert(!MyArray.is_empty(candidate));
    return candidate[0];
}

/**
 * Let a botnet of nuked servers hack a common target.  The target is
 * automatically chosen.  Not a good strategy.  There is no coordination between
 * the nodes in the botnet.  This is an early version of a hack manager.
 *
 * Usage: run quack/hgw/botnet.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    attack(ns);
}
