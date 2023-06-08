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
import { network } from "/quack/lib/network.js";

/**
 * Kill all scripts on world servers.  Exclude home server.
 *
 * Usage: run quack/kill-script.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    const kill = (host) => ns.killall(host);
    const is_nuked = (host) => ns.hasRootAccess(host);
    const not_home = (host) => host !== server_t.HOME;
    network(ns).filter(is_nuked).filter(not_home).forEach(kill);
}
