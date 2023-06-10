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
// Miscellaneous boolean values.
/// ///////////////////////////////////////////////////////////////////////

export const bool_t = {
    /**
     * Whether a graph is directed or undirected.
     */
    DIRECTED: true,
    UNDIRECTED: false,
    /**
     * Whether we have a certain property.
     */
    HAS: true,
    NOT: false,
    /**
     * Whether we have access to 4S data and API.
     */
    HAS_4S: true,
    NO_4S: false,
    /**
     * Whether or not we are dealing with currency.
     */
    MONEY: true,
    NOT_MONEY: false,
    /**
     * Whether or not we are successful at something.
     */
    SUCCESS: true,
    FAILURE: false,
};
