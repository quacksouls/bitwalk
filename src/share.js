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

/**
 * Share RAM with a faction.  Doing so would increase our reputation gains
 * within that faction.  Run this script using as many threads as possible to
 * increase our reputation gains even further.
 *
 * Usage: run quack/share.js -t [numThread]
 * Example: run quack/share.js -t 42
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    for (;;) {
        await ns.share();
    }
}
