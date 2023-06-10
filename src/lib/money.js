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
import { MyNumber } from "/quack/lib/number.js";

/// ///////////////////////////////////////////////////////////////////////
// Managing and manipulating money.
/// ///////////////////////////////////////////////////////////////////////

/**
 * A class to hold information about money.
 */
export class Money {
    /**
     * Format currency.
     *
     * @param {number} amount Format this amount as currency.
     * @returns {string} The given amount formatted as currency.
     */
    static format(amount) {
        return `$${MyNumber.format(amount, bool_t.MONEY)}`;
    }
}

/**
 * The amount of money the player has.
 *
 * @param {NS} ns The Netscript API.
 * @returns {number} Our current amount of money.
 */
export function money(ns) {
    return ns.getServerMoneyAvailable(server_t.HOME);
}
