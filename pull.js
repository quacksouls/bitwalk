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

// NOTE: This script is auto-generated by pull.sh.
// Do not import anything into this script.  The script should be self-contained
// and independent.

/**
 * A function for assertion.
 *
 * @param {boolean} cond Assert that this condition is true.
 * @returns {exception} Throw an error if the given condition is false.
 */
function assert(cond) {
    if (!cond) {
        throw new Error("Assertion failed.");
    }
}

/**
 * The directory structure under "src/" on github.com.
 *
 * @returns {array<string>} All files under "src/" on github.com.
 */
function dir_structure() {
    const filesystem = [
        // Insert directory tree here.  Should contain sample scripts for
        // playing Bitburner.
        "early-deploy.js",
        "early-hack.js",
        "hello.js",
        "lib/constant/bool.js",
        "lib/constant/script.js",
        "lib/constant/server.js",
        "lib/constant/string.js",
        "lib/server.js",
        "lib/string.js",
        "lib/util.js",
    ];
    assert(filesystem.length > 0);
    return filesystem;
}

/**
 * A formatted name of the file where we want to save the downloaded file.  The
 * terminal command "wget" behaves differently from the API function
 * "ns.wget()".  The command "wget" is happy to create the required directory
 * if we do any of the following:
 *
 * wget /URL/to/src/file.js src/file.js
 * wget /URL/to/src/file.js /src/file.js
 *
 * The API function "ns.wget()" is happy with this
 *
 * await ns.wget("/URL/to/src/file.js", "/src/file.js", "home");
 *
 * but cannot handle this
 *
 * await ns.wget("/URL/to/src/file.js", "src/file.js", "home");
 *
 * That is, we must have the leading forward slash "/" character for the
 * function to work properly.  Here are the relevant issues on github.com:
 *
 * https://github.com/danielyxie/bitburner/issues/1935
 * https://github.com/danielyxie/bitburner/issues/2115
 *
 * @param {string} f A file name.  Cannot be empty string.
 * @returns {string} A possibly new file name with the leading forward slash "/"
 *     character added.
 */
function target_name(f) {
    assert(f !== "");
    const fname = f.toString();
    const prefix = "/quack";
    const slash = "/";
    return [prefix, slash, fname].join("");
}

/**
 * Print the usage information.
 *
 * @param {NS} ns The Netscript API.
 */
function usage(ns) {
    const msg = "Usage: run pull.js";
    ns.tprintf(msg);
}

/**
 * Pull all files (on github.com) under the directory quacksouls/bitwalk/src
 * into the game.
 *
 * Usage: run pull.js
 *
 * @param {NS} ns The Netscript API.
 */
export async function main(ns) {
    // Sanity check.
    // The script does not accept any command line arguments.
    if (ns.args.length > 0) {
        usage(ns);
        return;
    }
    // Pull files into our home server.
    const home = "home";
    // The base URL where files are found.
    const github = "https://raw.githubusercontent.com/";
    const quack = "quacksouls/bitwalk/main/src/";
    const prefix = github + quack;
    // Pull files into home server.
    for (const f of dir_structure()) {
        const file = prefix + f;
        const target = target_name(f);
        const success = await ns.wget(file, target, home);
        if (success) {
            ns.tprintf(file);
        }
    }

    const msg = "Download complete";
    ns.tprintf(msg);
    ns.toast(msg);
}
