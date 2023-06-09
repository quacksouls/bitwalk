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

import { server_t } from "/quack/lib/constant/server.js";
import { Server } from "/quack/lib/server.js";

/// ///////////////////////////////////////////////////////////////////////
// Network related utilities.
/// ///////////////////////////////////////////////////////////////////////

/**
 * Scan all servers in the game world.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} root Start scanning from this server.  Default is home
 *     server.
 * @param {set} visit Set of servers visited so far.  Default is empty set.
 * @returns {array<string>} Hostnames of all world servers.
 */
export function network(ns, root = server_t.HOME, visit = new Set()) {
    const not_visited = (host) => !visit.has(host);
    // Use a recursive version of depth-first search.
    ns.scan(root)
        .filter(not_visited)
        .forEach((host) => {
            visit.add(host);
            network(ns, host, visit);
        });
    return [...visit];
}

/**
 * Nuke as many world servers as possible.
 *
 * @param {NS} ns The Netscript API.
 * @returns {array<string>} All nuked servers.  Exclude purchased servers.
 */
export function nuke_servers(ns) {
    const not_pserv = (host) => !ns.getServer(host).purchasedByPlayer;
    const is_nuked = (host) => {
        const server = new Server(ns, host);
        return server.nuke();
    };
    return network(ns).filter(not_pserv).filter(is_nuked);
}
