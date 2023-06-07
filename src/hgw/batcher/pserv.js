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

import { hgw_t } from "/quack/lib/constant/hgw.js";
import { time_t } from "/quack/lib/constant/time.js";
import { PservHGW } from "/quack/lib/batch.js";
import { is_valid_target as is_valid_host } from "/quack/lib/hgw.js";
import { log } from "/quack/lib/log.js";
import { Time } from "/quack/lib/time.js";
import { assert } from "/quack/lib/util.js";

/**
 * Use a parallel batcher to continuously hack a server.  Steal a certain
 * percentage of the server's money, then weaken/grow the server until it is at
 * minimum security level and maximum money.  Rinse and repeat.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host Hostname of a purchased server.
 * @param {string} target Hostname of the world server to target.
 */
async function hack(ns, host, target) {
    // Prep the target server.
    const batcher = new PservHGW(ns, host);
    batcher.scp_scripts();
    ns.printf(`Prepping target ${target}`);
    await batcher.prep_server(target);
    ns.printf(`Target ${target} is prepped`);

    // Launch parallel batches whenever we can.
    let i = 0;
    let fail = 0;
    let max_fail = max_failures(ns, target);
    for (;;) {
        const success = batcher.launch_batch(target);
        if (success) {
            i++;
            fail = 0;
            ns.printf(`Launched batch ${i}`);
        } else {
            fail++;
            ns.printf(`Failure ${fail} to launch batch`);
            await ns.sleep(time_t.SECOND);
        }

        if (is_prep_time(i, fail, max_fail)) {
            ns.printf(
                `Prep cycle, batches launched = ${i}, failures = ${fail}`
            );
            await batcher.prep_server(target);
            i = 0;
            fail = 0;
            max_fail = max_failures(ns, target);
        }
        await ns.sleep(hgw_t.batch.SLEEP);
    }
}

/**
 * Whether it is time to prep a server.  We prep a server provided one of the
 * following conditions holds:
 *
 * (1) We have launched a certain number of batches against the server;
 * (2) We have encountered a given number of consecutive failures in launching
 *     batches.
 *
 * In general, after several batches have completed it is possible for the
 * target server to not be in the prepped state.
 *
 * @param {number} batch How many batches have run to completion.
 * @param {number} fail How many consecutive failures we have.
 * @param {number} max_fail Tolerate this many consecutive failures.
 * @returns {boolean} True if it is time for a prep cycle; false otherwise.
 */
function is_prep_time(batch, fail, max_fail) {
    return batch >= hgw_t.batch.MAX || fail >= max_fail;
}

/**
 * The maximum number of failures we can tolerate before entering the prep
 * state.  If we have too many failures to launch a batch, the issue might be
 * due to desynchronization or insufficient RAM.  In any case, prepping the
 * target again solves the problem.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} target Hostname of the server to hack.
 * @returns {number} Tolerate this many failures to launch a batch.
 */
function max_failures(ns, target) {
    const nsecond = Math.ceil(Time.to_second(ns.getWeakenTime(target)));
    return Math.ceil(1.2 * nsecond);
}

/**
 * Various sanity checks.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} host Hostname of a purchased server.
 * @param {string} target Hostname of the server to hack.
 */
function sanity_checks(ns, host, target) {
    assert(is_valid_host(host));
    assert(is_valid_host(target));
    assert(ns.getServerMaxMoney(target) > 0);
}

/**
 * Suppress various log messages.
 *
 * @param {NS} ns The Netscript API.
 */
function shush(ns) {
    ns.disableLog("getServerMaxMoney");
    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("getServerUsedRam");
    ns.disableLog("sleep");
}

/**
 * A parallel batcher running on a purchased server.  This script accepts the
 * command line arguments:
 *
 * (1) host := Hostname of the purhased server where we will run our batcher.
 * (2) target := Hostnmame of the server to hack.
 *
 * Usage: run quack/hgw/batcher/pserv.js [host] [target]
 * Example: run quack/hgw/batcher/pserv.js pserv phantasy
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    const [host, target] = ns.args;
    sanity_checks(ns, host, target);
    shush(ns);
    log(ns, `Launch batcher against ${target}`);
    await hack(ns, host, target);
}
