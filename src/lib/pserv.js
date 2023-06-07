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
import { is_valid_target as is_valid_host } from "/quack/lib/hgw.js";
import { money } from "/quack/lib/money.js";
import { assert } from "/quack/lib/util.js";

/**
 * A class that holds information specific to purchased servers.
 */
export class PurchasedServer {
    /**
     * The Netscript API.
     */
    #ns;

    /**
     * Create an object to represent a purchased server.
     *
     * @param {NS} ns The Netscript API.
     */
    constructor(ns) {
        this.#ns = ns;
    }

    /**
     * Whether we can upgrade the RAM of a purchased server.
     *
     * @param {string} host Hostname of the purchased server to upgrade.
     * @param {number} ram Upgrade the server to this amount of RAM.
     * @returns {boolean} True if we can upgrade the purchased server to the
     *     given amount of RAM; false otherwise.
     */
    can_upgrade(host, ram) {
        assert(this.has_server(host));
        return money(this.#ns) > this.cost(ram);
    }

    /**
     * The cost of buying a server with the given amount of RAM (GB).
     *
     * @param {number} ram We want a purchased server having this amount of RAM.
     *     RAM is assumed to be a power of 2.
     * @returns {number} The cost for a purchased server having the given RAM.
     */
    cost(ram) {
        return this.#ns.getPurchasedServerCost(ram);
    }

    /**
     * All servers in our farm of purchased servers.
     *
     * @returns {array<string>} Hostnames of our purchased servers.
     */
    farm() {
        return this.#ns.getPurchasedServers();
    }

    /**
     * Whether we have the maximum number of purchased servers.
     *
     * @returns {boolean} True if we have the maximum number of purchased
     *     servers; false otherwise.
     */
    has_max() {
        return this.farm().length === this.limit();
    }

    /**
     * Whether we have a given purchased server.
     *
     * @param {string} host Hostname of a purchased server.
     * @returns {boolean} True if we have the given purchased server;
     *     false otherwise.
     */
    has_server(host) {
        assert(is_valid_host(host));
        return this.farm().includes(host);
    }

    /**
     * The maximum number of purchased servers that can be bought.
     *
     * @returns {number} How many purchased servers we can have in our farm.
     */
    limit() {
        return this.#ns.getPurchasedServerLimit();
    }

    /**
     * The maximum amount of RAM of a purchased server.
     *
     * @param {string} host Query this purchased server.
     * @returns {number} The maximum amount of RAM of the given server.
     */
    max_ram(host) {
        assert(this.has_server(host));
        return this.#ns.getServerMaxRam(host);
    }

    /**
     * Purchase a new server with the given hostname and amount of RAM (GB).
     *
     * @param {string} host Hostname of the new purchased server.  If we already
     *     have a purchased server with the given hostname, a numeric value
     *     would automatically be appended to the hostname.
     * @param {number} ram The amount of RAM (GB) of the purchased server.
     * @returns {string} The hostname of the newly purchased server.
     */
    purchase(host, ram) {
        return this.#ns.purchaseServer(host, ram);
    }

    /**
     * Upgrade the RAM of a purchased server.
     *
     * @param {string} host Upgrade this purchased server.
     * @param {number} ram Upgrade the purchased server to this amount of RAM.
     * @returns {boolean} True if the upgrade is successful; false otherwise.
     */
    upgrade(host, ram) {
        if (!this.can_upgrade(host, ram) || this.max_ram(host) >= ram) {
            return bool_t.FAILURE;
        }
        return this.#ns.upgradePurchasedServer(host, ram);
    }
}
