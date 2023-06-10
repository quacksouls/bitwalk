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

/// ///////////////////////////////////////////////////////////////////////
// NOTE: Import only constants into this file.
// Miscellaneous helper functions.
/// ///////////////////////////////////////////////////////////////////////

/**
 * A function for assertion.
 *
 * @param {expression} cond Assert that this condition is true.
 * @returns {Error} Throw an assertion error if the given condition is false.
 */
export function assert(cond) {
    if (!cond) {
        throw new Error("Assertion failed");
    }
}

/**
 * Whether a variable is boolean.
 *
 * @param {expression} x We want to determine whether this is a boolean.
 * @returns {boolean} True if the given parameter is a boolean; false otherwise.
 */
export function is_boolean(x) {
    return typeof x === "boolean";
}

/**
 * A hackish way to implement shell scripting in Bitburner.  Emulate terminal
 * input.
 *
 * @param {string} cmd Run this command from the terminal.
 */
export function shell(cmd) {
    // Template code from the official documentation of Bitburner:
    //
    // https://bitburner-official.readthedocs.io/en/latest/netscript/advancedfunctions/inject_html.html
    const input = globalThis["document"].getElementById("terminal-input"); // eslint-disable-line
    input.value = cmd;
    const handler = Object.keys(input)[1];
    input[handler].onChange({
        target: input,
    });
    input[handler].onKeyDown({
        key: "Enter",
        preventDefault: () => null,
    });
}
