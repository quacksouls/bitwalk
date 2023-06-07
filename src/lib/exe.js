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
import { darkweb_t } from "/quack/lib/constant/tor.js";

/// ///////////////////////////////////////////////////////////////////////
// Utility functions related to programs that can be created or purchased.
/// ///////////////////////////////////////////////////////////////////////

/**
 * Whether we have the program Formulas.exe.
 *
 * @param {NS} ns The Netscript API.
 * @returns {boolean} True if we have the program Formulas.exe; false otherwise.
 */
export function has_formulas(ns) {
    return has_program(ns, darkweb_t.program.FORMULAS);
}

/**
 * Whether we have a particular program.
 *
 * @param {NS} ns The Netscript API.
 * @param {string} prog Do we have this program?
 * @returns {boolean} True if we have the given program; false otherwise.
 */
export function has_program(ns, prog) {
    return ns.fileExists(prog, server_t.HOME);
}
