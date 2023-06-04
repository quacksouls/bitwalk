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

import { hgw_t } from "/quack/lib/constant/hgw.js";
import { server_t } from "/quack/lib/constant/server.js";
import { nuke_servers } from "/quack/lib/network.js";
import { is_bankrupt } from "/quack/lib/server.js";

/// ///////////////////////////////////////////////////////////////////////
// Utility functions for batching.
/// ///////////////////////////////////////////////////////////////////////

/**
 * Determine which world servers to target.
 *
 * @param {NS} ns The Netscript API.
 * @returns {array<string>} An array of hostnames.  We have root access on each
 *     server.  The array is sorted in descending order of server weight.
 */
export function find_candidates(ns) {
    const descending_weight = (s, t) => weight(ns, t) - weight(ns, s);
    const positive_weight = (host) => weight(ns, host) > 0;
    const blacklist = new Set(hgw_t.blacklist);
    const is_hackable = (host) => !blacklist.has(host);
    const not_bankrupt = (host) => !is_bankrupt(ns, host);
    return nuke_servers(ns)
        .filter(is_hackable)
        .filter(not_bankrupt)
        .filter(positive_weight)
        .sort(descending_weight);
}

/**
 * The weight, or hack desirability, of a server.  Higher weight is better.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host The hostname of a server.
 * @returns {number} A non-negative number representing the hack desirability of
 *     the given server.
 */
export function weight(ns, host) {
    const server = ns.getServer(host);
    const threshold = Math.floor(ns.getHackingLevel() / 2);
    if (
        host === server_t.HOME
        || server.purchasedByPlayer
        || !server.hasAdminRights
        || server.requiredHackingSkill > threshold
    ) {
        return 0;
    }
    return server.moneyMax / server.minDifficulty;
}
