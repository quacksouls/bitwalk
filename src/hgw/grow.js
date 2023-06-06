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
 * Grow money on a target server.
 *
 * Usage: run quack/hgw/grow.js [targetServer]
 * Example: run quack/hgw/grow.js n00dles
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    const target = ns.args[0];
    await ns.grow(target);
}
