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

import { number_t } from "/quack/lib/constant/number.js";

/// ///////////////////////////////////////////////////////////////////////
// Various static methods for handling numbers.
/// ///////////////////////////////////////////////////////////////////////

export class MyNumber {
    /**
     * Format a number according to whether it is in the thousands, millions,
     * billions, etc.
     *
     * @param {number} num Format this number.
     * @param {boolean} to_fixed Whether to fix at the default number of decimal
     *     digits.  Only useful for numbers whose absolute values are less than
     *     1,000.  Default is false.
     * @returns {string} The same number, but formatted.
     */
    static format(num, to_fixed = false) {
        // Sanity checks.
        const n = Math.abs(Number(num));
        const sign = Math.sign(num);
        const ndigit = 3;

        const add_sign = (x) => (sign < 0 ? -1 * x : x);

        if (n < 1e3) {
            const signed_num = add_sign(n);
            return to_fixed ? `${signed_num.toFixed(ndigit)}` : `${signed_num}`;
        }

        const fmt = (divisor, suffix) => {
            const signed_num = add_sign(n / divisor);
            const fstr = signed_num.toFixed(ndigit);
            return `${fstr}${suffix}`;
        };

        // divisor := threshold[0][dindex]
        // suffix := threshold[0][sindex]
        const threshold = [
            [number_t.QUINTILLION, "Q"],
            [number_t.QUADRILLION, "q"],
            [number_t.TRILLION, "t"],
            [number_t.BILLION, "b"],
            [number_t.MILLION, "m"],
            [number_t.THOUSAND, "k"],
        ];
        const dindex = 0;
        const meet_threshold = (tau) => n >= tau[dindex];
        const [divisor, suffix] = threshold.find(meet_threshold);
        return fmt(divisor, suffix);
    }
}
