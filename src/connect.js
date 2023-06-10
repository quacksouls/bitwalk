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
import { server_t } from "/quack/lib/constant/server.js";
import { network, shortest_path } from "/quack/lib/network.js";
import { shell } from "/quack/lib/util.js";

/**
 * Connect to a given target server.
 *
 * @param {array<string>} path Hostnames along the path that connects to a
 *     target server.  The target server is the last element of this array.
 */
function goto(path) {
    // A chain of terminal commands that connect to the target server.
    const not_home = (host) => host !== server_t.HOME;
    const cmd = `connect ${path.filter(not_home).join("; connect ")}`;
    shell(cmd);
}

/**
 * Connect to a target server.  This script accepts a command line argument:
 *
 * (1) target := Connect to this server.
 *
 * Usage: run quack/connect.js [target]
 * Example: run quack/connect.js run4theh111z
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    // Must provide a command line argument.
    const target = ns.args[0];
    const error_msg = "Must provide the name of the target server.";
    if (target === undefined) {
        ns.tprintf(error_msg);
        return;
    }

    if (target === server_t.HOME) {
        ns.tprintf("Target cannot be home server");
    }

    // Not a server in the game world.
    const server = new Set(network(ns));
    if (!server.has(target)) {
        ns.tprintf(`Server not found: ${target}`);
        return;
    }

    // Find shortest path.
    const path = shortest_path(ns, server_t.HOME, target);
    if (MyArray.is_empty(path)) {
        ns.tprintf(`Target server must be reachable from ${server_t.HOME}.`);
        return;
    }
    goto(path);
}
