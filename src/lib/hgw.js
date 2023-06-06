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
import { script_t } from "/quack/lib/constant/script.js";
import { server_t } from "/quack/lib/constant/server.js";
import { time_t } from "/quack/lib/constant/time.js";
import { nuke_servers } from "/quack/lib/network.js";
import { can_run_script, is_bankrupt, num_threads } from "/quack/lib/server.js";
import { MyString } from "/quack/lib/string.js";
import { assert } from "/quack/lib/util.js";

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
 * Whether a server's money is at its maximum.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host The hostname of a server.
 * @returns {boolean} True if the amount of money on the given server is at its
 *     maximum; false otherwise.
 */
export function has_max_money(ns, host) {
    const { moneyAvailable, moneyMax } = ns.getServer(host);
    return moneyAvailable >= moneyMax;
}

/**
 * Whether a server's security level is at its minimum.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host The hostname of a server.
 * @returns {boolean} True if the security level of the given server is at its
 *     minimum; false otherwise.
 */
export function has_min_security(ns, host) {
    const { hackDifficulty, minDifficulty } = ns.getServer(host);
    return hackDifficulty <= minDifficulty;
}

/**
 * Perform an HGW action against a target server.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host Perform an HGW action against this server.  Cannot be
 *     our home server.
 * @param {array<string>} botnet An array of world servers on which we have root
 *     access.  Use these servers to perform an HGW action against the given
 *     target.
 * @param {string} action The action we want to perform against the given target
 *     server.  Supported actions are:
 *     (1) "grow" := Grow money on the target server.
 *     (2) "weaken" := Weaken the security level of the target server.
 */
export async function hgw_action(ns, host, botnet, action) {
    assert(is_valid_target(host));
    assert(!MyArray.is_empty(botnet));
    assert(action === hgw_t.action.GROW || action === hgw_t.action.WEAKEN);

    const time = hgw_wait_time(ns, host, action);
    const script = hgw_script(action);
    const has_ram_for_script = (serv) => can_run_script(ns, script, serv);
    const nthread = (serv) => num_threads(ns, script, serv);
    const run_script = (serv) => {
        const option = { preventDuplicates: true, threads: nthread(serv) };
        return ns.exec(script, serv, option, host);
    };

    const pid = botnet.filter(has_ram_for_script).map(run_script);
    if (MyArray.is_empty(pid)) {
        return;
    }
    await ns.sleep(time);
    while (!is_action_done(ns, pid)) {
        await ns.sleep(time_t.SECOND);
    }
}

/**
 * The HGW script to use for a given HGW action.
 *
 * @param {string} action The action we want to perform against a target server.
 *     Supported actions are:
 *     (1) "grow" := Grow money on the target server.
 *     (2) "hack" := Steal money from the target server.
 *     (3) "weaken" := Weaken the security level of the target server.
 * @returns {string} The HGW script corresponding to the given action.
 */
export function hgw_script(action) {
    switch (action) {
        case hgw_t.action.GROW:
            return script_t.hgw.GROW;
        case hgw_t.action.HACK:
            return script_t.hgw.HACK;
        case hgw_t.action.WEAKEN:
            return script_t.hgw.WEAKEN;
        default:
            // Should never reach here.
            assert(false);
    }
}

/**
 * The amount of time in milliseconds we must wait for an HGW action to
 * complete.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host Perform an HGW action against this server.
 * @param {string} action The action we want to perform against the given target
 *     server.  Supported actions are:
 *     (1) "grow" := Grow money on the target server.
 *     (2) "hack" := Steal money from the target server.
 *     (3) "weaken" := Weaken the security level of the target server.
 * @returns {number} The amount of time required for the given action to
 *     complete on the target server.
 */
export function hgw_wait_time(ns, host, action) {
    switch (action) {
        case hgw_t.action.GROW:
            return ns.getGrowTime(host);
        case hgw_t.action.HACK:
            return ns.getHackTime(host);
        case hgw_t.action.WEAKEN:
            return ns.getWeakenTime(host);
        default:
            // Should never reach here.
            assert(false);
    }
}

/**
 * Whether an HGW action is completed.
 *
 * @param {NS} ns The Netscript API.
 * @param {array<number>} pid An array of PIDs.
 * @returns {boolean} True if all processes having the given PIDs are done;
 *     false otherwise.
 */
export function is_action_done(ns, pid) {
    assert(!MyArray.is_empty(pid));
    const is_done = (i) => !ns.isRunning(i);
    return pid.every(is_done);
}

/**
 * Whether a server is prepped.  A server is said to be prepped if its security
 * level is at minimum and its money is at maximum.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host Test this server.
 * @returns {boolean} True if the target server is prepped; false otherwise.
 */
export function is_prepped(ns, host) {
    return has_min_security(ns, host) && has_max_money(ns, host);
}

/**
 * Whether a target server is valid.  Usually we should exclude our home server.
 *
 * @param {string} host Hostname of the target server.
 * @returns {boolean} True if the given server is valid for targeting;
 *     false otherwise.
 */
export function is_valid_target(host) {
    return !MyString.is_empty(host) && host !== server_t.HOME;
}

/**
 * Use a botnet to prepare a server for hacking.  We use the following strategy.
 *
 * (1) Weaken
 * (2) Grow
 *
 * Apply the above strategy in a loop.  Repeat until the target server has
 * minimum security and maximum money.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host Prep this server.
 */
export async function prep_server(ns, host) {
    const script = [script_t.hgw.GROW, script_t.hgw.HACK, script_t.hgw.WEAKEN];
    const scp = (serv) => ns.scp(script, serv, server_t.HOME);
    for (;;) {
        const botnet = nuke_servers(ns);
        botnet.forEach(scp);
        if (!has_min_security(ns, host)) {
            await hgw_action(ns, host, botnet, hgw_t.action.WEAKEN);
        }
        if (!has_max_money(ns, host)) {
            await hgw_action(ns, host, botnet, hgw_t.action.GROW);
        }
        if (is_prepped(ns, host)) {
            return;
        }
        await ns.sleep(0);
    }
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
