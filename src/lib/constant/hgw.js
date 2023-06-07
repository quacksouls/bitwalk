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

/// ///////////////////////////////////////////////////////////////////////
// Miscellaneous constants for batchers.
/// ///////////////////////////////////////////////////////////////////////

export const hgw_t = {
    /**
     * Various actions in the HGW model.
     */
    action: {
        GROW: "grow",
        HACK: "hack",
        WEAKEN: "weaken",
    },
    /**
     * Various constants related to one batch.
     */
    batch: {
        /**
         * The delay time between the firing of each HGW action.  Time is in
         * milliseconds.
         */
        DELAY: 250,
        /**
         * An invalid number of threads.
         */
        INVALID_NUM_THREAD: -1,
        /**
         * Run this many batches, then do a prep cycle.
         */
        MAX: 100,
        /**
         * Sleep for this amount of time before firing another batch.  Time is
         * in milliseconds.
         */
        SLEEP: 100,
    },
    /**
     * Batchers or hack managers should not target any of these servers.
     */
    blacklist: [server_t.HOME, server_t.JOE, server_t.NOODLE],
    /**
     * The fraction of money to steal from a server.
     */
    money: {
        HALF: 0.5,
    },
    /**
     * The maximum amount of RAM for a purchased server running a batcher.
     */
    PSERV_MAX_RAM: 16384, // 2^14
};
