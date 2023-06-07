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
import { assert } from "/quack/lib/util.js";

/// ///////////////////////////////////////////////////////////////////////
// Miscellaneous static methods related to time conversion.
/// ///////////////////////////////////////////////////////////////////////

export class Time {
    /**
     * Convert an amount of time in milliseconds to seconds.
     *
     * @param {number} m An amount of time in milliseconds.
     * @returns {number} The same amount of time but given in seconds.
     */
    static to_second(m) {
        assert(m >= 0);
        return m / time_t.SECOND;
    }
}
