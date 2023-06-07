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
import { bool_t } from "/quack/lib/constant/bool.js";
import { hgw_t } from "/quack/lib/constant/hgw.js";
import { script_t } from "/quack/lib/constant/script.js";
import { server_t } from "/quack/lib/constant/server.js";
import { time_t } from "/quack/lib/constant/time.js";
import {
    has_max_money,
    has_min_security,
    hgw_script,
    hgw_wait_time,
    is_prepped,
    is_valid_target,
} from "/quack/lib/hgw.js";
import { can_run_script, free_ram, num_threads } from "/quack/lib/server.js";
import { assert } from "/quack/lib/util.js";

/**
 * A purchased server that uses various HGW strategies.
 */
export class PservHGW {
    /**
     * Hostname of a purchased server.
     */
    #host;

    /**
     * The Netscript API.
     */
    #ns;

    /**
     * Create an object to represent a purchased server that uses various
     * batching strategies.
     *
     * @param {NS} ns The Netscript API.
     * @param {string} host Hostname of a purchased server.
     */
    constructor(ns, host) {
        this.#ns = ns;
        this.#host = host;
    }

    /**
     * The thread and RAM parameters for one batch.
     *
     * WARNING: Must have access to the Formulas API.
     *
     * @param {string} host Hostname of the server our batch will target.
     * @param {number} thread The number of threads to run ns.hack().
     * @returns {object} The batch parameters, structured as:
     *     {
     *         hack: {
     *             ram: number, // RAM required for hack threads.
     *             thread: number, // Number of threads to run ns.hack().
     *             time: number, // Time required for ns.hack() to finish.
     *         },
     *         grow: {
     *             ram: number, // RAM required for grow threads.
     *             thread: number, // Number of threads to run ns.grow().
     *             time: number, // Time required for ns.grow() to finish.
     *         },
     *         weaken: {
     *             ram: number, // RAM required for weaken threads.
     *             thread: number, // Number of threads to run ns.weaken().
     *             time: number, // Time required for ns.weaken() to finish.
     *         }
     *     }
     */
    batch_parameters(host, thread) {
        // The number of hack threads required, the hack time, and the effect of
        // hacking.
        const hthread = Math.floor(thread);
        const server = this.#ns.getServer(host);
        const htime = this.#ns.getHackTime(host);
        const money_fraction = this.#ns.hackAnalyze(host);
        const money_hacked = hthread * money_fraction * server.moneyMax;
        server.hackDifficulty += this.#ns.hackAnalyzeSecurity(hthread, host);
        server.moneyAvailable = server.moneyMax - money_hacked;

        // The number of grow threads required, the grow time, and the effect of
        // growing.
        const gthread = this.#ns.formulas.hacking.growThreads(
            server,
            this.#ns.getPlayer(),
            server.moneyMax
        );
        const gtime = this.#ns.getGrowTime(host);

        // The number of weaken threads required and the weaken time.
        const hack_sec_increase = this.#ns.hackAnalyzeSecurity(hthread, host);
        const grow_sec_increase = this.#ns.growthAnalyzeSecurity(gthread, host);
        const total_sec_increase = hack_sec_increase + grow_sec_increase;
        const wthread = Math.ceil(
            total_sec_increase / this.#ns.weakenAnalyze(1)
        );
        const wtime = this.#ns.getWeakenTime(host);

        // eslint-disable-next-line max-len
        const script_ram = (script) => this.#ns.getScriptRam(script, server_t.HOME);
        const required_ram = (script, nthread) => nthread * script_ram(script);
        return {
            hack: {
                ram: required_ram(script_t.hgw.HACK, hthread),
                thread: hthread,
                time: htime,
            },
            grow: {
                ram: required_ram(script_t.hgw.GROW, gthread),
                thread: gthread,
                time: gtime,
            },
            weaken: {
                ram: required_ram(script_t.hgw.WEAKEN, wthread),
                thread: wthread,
                time: wtime,
            },
        };
    }

    /**
     * Perform an HGW action against a target server.
     *
     * @param {string} target Perform an HGW action against this server.
     * @param {string} action The action we want to perform against the given
     *     target server.  Supported actions are:
     *     (1) "grow" := Grow money on the target server.
     *     (2) "weaken" := Weaken the security level of the target server.
     */
    async hgw_action(target, action) {
        assert(is_valid_target(target));
        const time = hgw_wait_time(this.#ns, target, action);
        const script = hgw_script(action);
        if (!can_run_script(this.#ns, script, this.#host)) {
            return;
        }

        const nthread = num_threads(this.#ns, script, this.#host);
        const option = { preventDuplicates: true, threads: nthread };
        const pid = this.#ns.exec(script, this.#host, option, target);
        await this.#ns.sleep(time);
        const is_done = () => !this.#ns.isRunning(pid);
        while (!is_done()) {
            await this.#ns.sleep(time_t.SECOND);
        }
    }

    /**
     * Launch a batch against a target server.  Use the model of parallel
     * batcher.
     *
     * @param {string} target Hostname of the server our batcher will target.
     * @returns {boolean} True if the batch was successfully launched;
     *     false otherwise.
     */
    launch_batch(target) {
        const hthread = this.num_hthreads(target);
        if (hthread === hgw_t.batch.INVALID_NUM_THREAD) {
            return bool_t.FAILURE;
        }

        const param = this.batch_parameters(target, hthread);
        // eslint-disable-next-line
        const exec = (script, nthread, time) => {
            const option = { preventDuplicates: true, threads: nthread };
            this.#ns.exec(
                script,
                this.#host,
                option,
                target,
                time,
                performance.now()
            );
        };

        let wait_g = param.weaken.time - hgw_t.batch.DELAY - param.grow.time;
        const wait_h = param.grow.time - hgw_t.batch.DELAY - param.hack.time;
        if (Math.floor(wait_g) <= 0) {
            wait_g = hgw_t.batch.DELAY;
        }
        exec(script_t.hgw.WEAKEN, param.weaken.thread, 0);
        exec(script_t.hgw.GROW, param.grow.thread, wait_g);
        exec(script_t.hgw.HACK, param.hack.thread, wait_g + wait_h);
        return bool_t.SUCCESS;
    }

    /**
     * The number of hack threads to use in one batch.
     *
     * @param {string} target Hostname of the server our batch will target.
     * @returns {number} The number of hack threads to use in one batch.
     */
    num_hthreads(target) {
        // The percentage of money we want to hack from the target server.
        const max_percent = Math.floor(hgw_t.money.HALF * 100);
        const percent = MyArray.sequence(max_percent + 1);
        percent.shift();
        percent.reverse();

        // The maximum percentage of money we can hack while using only the
        // RAM available on the host server.
        const available_ram = free_ram(this.#ns, this.#host);
        for (const pc of percent) {
            const money = (pc / 100) * this.#ns.getServerMaxMoney(target);
            const max_threads = Math.ceil(
                this.#ns.hackAnalyzeThreads(target, money)
            );
            const param = this.batch_parameters(target, max_threads);
            const thread = [
                param.hack.thread,
                param.grow.thread,
                param.weaken.thread,
            ];
            const invalid_thread = (t) => t < 1;
            if (thread.some(invalid_thread)) {
                continue;
            }

            // eslint-disable-next-line max-len
            const total_ram = param.hack.ram + param.grow.ram + param.weaken.ram;
            const exceed_ram = total_ram > available_ram;
            if (!exceed_ram) {
                return param.hack.thread;
            }
        }
        return hgw_t.batch.INVALID_NUM_THREAD;
    }

    /**
     * Prepare a world server for hacking.  We use the following strategy.
     *
     * (1) Weaken
     * (2) Grow
     *
     * Apply the above strategy in a loop.  Repeat until the target server has
     * minimum security level and maximum money.
     *
     * @param {string} host Prep this world server.
     */
    async prep_server(host) {
        for (;;) {
            if (!has_min_security(this.#ns, host)) {
                await this.hgw_action(host, hgw_t.action.WEAKEN);
            }
            if (!has_max_money(this.#ns, host)) {
                await this.hgw_action(host, hgw_t.action.GROW);
            }
            if (is_prepped(this.#ns, host)) {
                return;
            }
            await this.#ns.sleep(0);
        }
    }

    /**
     * Copy our HGW scripts over to a purchased server.
     */
    scp_scripts() {
        const file = [
            script_t.hgw.GROW,
            script_t.hgw.HACK,
            script_t.hgw.WEAKEN,
        ];
        this.#ns.scp(file, this.#host, server_t.HOME);
    }
}
