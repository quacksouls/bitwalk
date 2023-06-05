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
import { hnet_t } from "/quack/lib/constant/hnet.js";
import { log } from "/quack/lib/log.js";
import { money } from "/quack/lib/money.js";
import { assert } from "/quack/lib/util.js";

/**
 * All nodes in our Hacknet farm.
 *
 * @param {NS} ns The Netscript API.
 * @returns {array<number>} An array of node IDs.  An empty array if we have
 *     zero nodes.
 */
function hacknet_nodes(ns) {
    const n = ns.hacknet.numNodes();
    return n < 1 ? [] : MyArray.sequence(n);
}

/**
 * Whether we have sufficient money to cover a given cost.
 *
 * @param {NS} ns The Netscript API.
 * @param {number} cost Do we have enough funds to cover this cost?
 * @returns {boolean} True if we have funds to cover the given cost;
 *     false otherwise.
 */
function has_funds(ns, cost) {
    assert(cost > 0);
    return money(ns) > cost;
}

/**
 * Setup our farm of Hacknet nodes, each at base stat.
 *
 * @param {NS} ns The Netscript API.
 * @param {number} n How many Hacknet nodes in our farm.
 */
async function setup_farm(ns, n) {
    const nNode = Math.floor(n);
    assert(nNode > 0);
    assert(nNode <= ns.hacknet.maxNumNodes());
    if (ns.hacknet.numNodes() >= nNode) {
        return;
    }

    // Purchase Hacknet nodes for our farm.
    for (let i = ns.hacknet.numNodes(); i < nNode; i++) {
        if (!has_funds(ns, ns.hacknet.getPurchaseNodeCost())) {
            await ns.sleep(hnet_t.TICK);
            continue;
        }
        const id = ns.hacknet.purchaseNode();
        assert(id >= 0);
        log(ns, `Purchased Hacknet node ${id}`);
    }
}

/**
 * Suppress various log messages.
 *
 * @param {NS} ns The Netscript API.
 */
function shush(ns) {
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");
}

/**
 * Upgrade the level of each Hacknet node by one point.
 *
 * @param {NS} ns The Netscript API.
 */
function upgrade_level(ns) {
    const howmany = 1;
    const level = (node) => ns.hacknet.getNodeStats(node).level;
    const not_max = (node) => level(node) < hnet_t.MAX_LEVEL;
    hacknet_nodes(ns)
        .filter(not_max)
        .forEach((node) => {
            const cost = ns.hacknet.getLevelUpgradeCost(node, howmany);
            if (Number.isFinite(cost) && has_funds(ns, cost)) {
                ns.hacknet.upgradeLevel(node, howmany);
            }
        });
}

/**
 * Manage a farm of Hacknet nodes.
 *
 * Usage: run quack/hnet.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    shush(ns);
    await setup_farm(ns, hnet_t.SEED_NODE);

    // Occassionally expand and upgrade the farm.
    const threshold = Array.from(hnet_t.threshold);
    for (;;) {
        if (!MyArray.is_empty(threshold) && has_funds(ns, threshold[0][0])) {
            const min_nodes = threshold[0][1];
            await setup_farm(ns, min_nodes);

            // Ensure our Hacknet farm has at least the given number of nodes
            // before moving on to the next money/node thresholds.
            if (ns.hacknet.numNodes() >= min_nodes) {
                threshold.shift();
            }
        }
        upgrade_level(ns);
        await ns.sleep(hnet_t.TICK);
    }
}
