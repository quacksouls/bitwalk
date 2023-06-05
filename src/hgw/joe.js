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

import { script_t } from "/quack/lib/constant/script.js";
import { server_t } from "/quack/lib/constant/server.js";
import { Server } from "/quack/lib/server.js";

/**
 * Use a purchased server to hack joesguns.
 *
 * Usage: run quack/hgw/joe.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    const ram = 256;
    const host = ns.purchaseServer(server_t.PSERV, ram);
    const server = new Server(ns, host);
    server.deploy(script_t.EARLY_HACK, server_t.JOE);
}
