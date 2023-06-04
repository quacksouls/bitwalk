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

import { bool_t } from "/quack/lib/constant/bool.js";
import { server_t } from "/quack/lib/constant/server.js";
import { MyString } from "/quack/lib/string.js";
import { assert } from "/quack/lib/util.js";

/**
 * Manage a server.
 */
export class Server {
    /**
     * The hostname of this server.
     */
    #hostname;

    /**
     * The Netscript API.
     */
    #ns;

    /**
     * Create a server object with the given hostname.
     *
     * @param {NS} ns The Netscript API.
     * @param {string} host The hostname of a server.
     */
    constructor(ns, host) {
        this.#hostname = ns.getServer(host).hostname;
        this.#ns = ns;
    }

    /**
     * How much RAM (in GB) is available on this server.
     *
     * @returns {number} The amount of RAM available on this server.
     */
    available_ram() {
        return this.ram_max() - this.ram_used();
    }

    /**
     * Copy a hack script over to this server.  Run the hack script on this
     * server and use the server to hack the given target.
     *
     * @param {string} script Deploy this script against the given target.
     * @param {string} target We run a hack script against this target server.
     * @returns {boolean} True if the script is running on this server using at
     *     least one thread; false otherwise.
     */
    deploy(script, target) {
        // Sanity checks.
        assert(!MyString.is_empty(target));
        assert(!MyString.is_empty(script));
        const targ = this.#ns.getServer(target);
        if (
            !this.has_root_access()
            || !targ.hasAdminRights
            || !this.#ns.fileExists(script, server_t.HOME)
        ) {
            return bool_t.FAILURE;
        }

        // No free RAM on server to run our hack script.
        const nthread = this.num_threads(script);
        if (nthread < 1) {
            return bool_t.FAILURE;
        }

        // Copy our script over to this server.  Use the server to hack the
        // target.
        this.#ns.scp(script, this.hostname(), server_t.HOME);
        const option = { preventDuplicates: true, threads: nthread };
        this.#ns.exec(script, this.hostname(), option, targ.hostname);
        return bool_t.SUCCESS;
    }

    /**
     * Whether we have root access on this server.
     *
     * @returns {boolean} True if we have root access on this server;
     *     false otherwise.
     */
    has_root_access() {
        return this.#ns.getServer(this.hostname()).hasAdminRights;
    }

    /**
     * The hostname of this server.
     *
     * @returns {string} This server's hostname.
     */
    hostname() {
        return this.#hostname;
    }

    /**
     * Determine how many threads we can run a given script on this server.
     *
     * @param {string} script Run this script on the server.
     * @returns {number} The number of threads that can be used to run the given
     *     script on this server.  Return 0 if we cannot run the script using at
     *     least one thread.
     */
    num_threads(script) {
        const script_ram = this.#ns.getScriptRam(script, server_t.HOME);
        const avai_ram = this.available_ram();
        return avai_ram < script_ram ? 0 : Math.floor(avai_ram / script_ram);
    }

    /**
     * The maximum amount of RAM (GB) on this server.
     *
     * @returns {number} The largest amount of RAM on this server.
     */
    ram_max() {
        return this.#ns.getServer(this.hostname()).maxRam;
    }

    /**
     * How much RAM (GB) is already used on this server.
     *
     * @returns {number} Amount of used RAM.
     */
    ram_used() {
        return this.#ns.getServer(this.hostname()).ramUsed;
    }
}
