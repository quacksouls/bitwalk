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

// NOTE: Keep this script as independent and small as possible so that its RAM
// requirement is as low as possible.  Avoid importing anything into this
// script.

/**
 * NOTE: Assume we have root access on the target server.
 *
 * Grow money on a target server.  The script accepts these arguments:
 *
 * (1) target := Hostname of the server to target.
 * (2) waitTime := Additional amount of time (in milliseconds) to wait before
 *     the grow operation completes.
 *
 * Usage: run quack/hgw/grow.js [target] [waitTime]
 * Example: run quack/hgw/grow.js n00dles 42
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    const [target, time] = ns.args;
    if (time === undefined) {
        await ns.grow(target);
    } else {
        const option = { additionalMsec: Math.floor(Number(time)) };
        await ns.grow(target, option);
    }
}
