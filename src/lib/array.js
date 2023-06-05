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

import { assert } from "/quack/lib/util.js";

/**
 * Various utility methods for dealing with arrays.
 */
export class MyArray {
    /**
     * Whether an array is empty, i.e. has zero elements.
     *
     * @param {array} arr Test this array.
     * @returns {boolean} True if the given array is empty; false otherwise.
     */
    static is_empty(arr) {
        assert(Array.isArray(arr));
        return arr.length === 0;
    }
}