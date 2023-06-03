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
// NOTE: Keep this script as independent and small as possible so that its RAM
// requirement is as low as possible.  Avoid importing anything into this
// script.
/// ///////////////////////////////////////////////////////////////////////

/**
 * NOTE: Assume we have root access on the target server.
 *
 * Hack a server and steal its money.  Weaken the server's security as
 * necessary, grow the server in case the amount of money on the server is below
 * a threshold, and hack the server when all conditions are met.  This script
 * accepts the following command line argument:
 *
 * (1) target := Hostname of the server to target.
 *
 * Usage: run quack/early-hack.js [target]
 * Example: run quack/early-hack.js n00dles
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    const target = ns.args[0];

    // How much money a server should have before we hack it.  Even if the
    // server is bankrupt, successfully hacking it would increase our Hack XP,
    // although we would not receive any money.  Set the money threshold at 75%
    // of the server's maximum money.
    const money_threshold = Math.floor(ns.getServerMaxMoney(target) * 0.75);

    // The threshold for the server's security level.  If the target's security
    // level is higher than the threshold, weaken the target before doing
    // anything else.
    const security_threshold = ns.getServerMinSecurityLevel(target) + 5;

    // Continuously hack/grow/weaken the target server.
    for (;;) {
        const money = ns.getServerMoneyAvailable(target);
        if (ns.getServerSecurityLevel(target) > security_threshold) {
            await ns.weaken(target);
        } else if (money < money_threshold) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
