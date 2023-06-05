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

import { colour_t } from "/quack/lib/constant/colour.js";
import { string_t } from "/quack/lib/constant/string.js";
import { MyString } from "/quack/lib/string.js";

/// ///////////////////////////////////////////////////////////////////////
// Miscellaneous functions for logging main events.
/// ///////////////////////////////////////////////////////////////////////

/**
 * Print a log to the terminal.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} msg Print this message to the terminal.
 * @param {string} colour Use this colour to print the given message.  Default
 *     is empty string, i.e. use the default colour theme of the terminal.
 */
export function log(ns, msg, colour = "") {
    const date = new Date(Date.now()).toISOString();
    const suffix = MyString.is_empty(colour) ? string_t.EMPTY : colour_t.RESET;
    ns.tprintf(`[${date}] ${colour}${ns.getScriptName()}: ${msg}${suffix}`);
}
