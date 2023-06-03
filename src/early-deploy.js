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
 * Deploy a hack script against a target server.  Use the server to hack itself.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} script A hack script.
 * @param {string} target Deploy the script against this server.
 */
function deploy(ns, script, target) {
    ns.nuke(target);
    const server = new Server(ns, target);
    server.deploy(script, target);
}

/**
 * An early deployment script.  Let a nuked server hack itself.  At the moment,
 * only consider servers that do not require any ports to be opened.
 *
 * Usage: run quack/early-deploy.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    const target = [
        server_t.FOOD,
        server_t.JOE,
        server_t.NECTAR,
        server_t.NOODLE,
        server_t.SIGMA,
        server_t.SUSHI,
        server_t.TEA,
    ];
    target.forEach((host) => deploy(ns, script_t.EARLY_HACK, host));
}
