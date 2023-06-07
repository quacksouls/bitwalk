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
// A bunch of constant values related to purchased servers.
/// ///////////////////////////////////////////////////////////////////////

export const pserv_t = {
    ram: {
        /**
         * The default amount of RAM for each purchased server.
         */
        DEFAULT: 1024,
    },
    /**
     * The prefix for the name of each purchased server.  The very first
     * purchased server is always named "pserv".  Any subsequent purchased
     * server is named as pserv-n, where n is a non-negative integer.
     */
    PREFIX: "pserv",
    /**
     * Sleep for this interval of time.  Currently it is 5 minutes.
     */
    TICK: 300e3,
};
