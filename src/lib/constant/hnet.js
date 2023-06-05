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

import { time_t } from "/quack/lib/constant/time.js";

/// ///////////////////////////////////////////////////////////////////////
// Miscellaneous constants related to Hacknet.
/// ///////////////////////////////////////////////////////////////////////

export const hnet_t = {
    /**
     * Upgrade each node to at most this level.
     */
    MAX_LEVEL: 50,
    /**
     * The initial number of Hacknet nodes to buy.  Start our Hacknet farm
     * with this many nodes.
     */
    SEED_NODE: 3,
    /**
     * The money/node thresholds.  Use these to gauge how many Hacknet nodes we
     * should have at a given money threshold.  If our money is x, then we
     * should have at least y Hacknet nodes.
     */
    threshold: [
        [10e6, 6],
        [1e9, 9],
    ],
    /**
     * One tick of a Hacknet cycle.  This is our custom tick value, not the
     * update tick used in the game.
     */
    TICK: time_t.MINUTE,
};
