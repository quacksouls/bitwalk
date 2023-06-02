# Miscellaneous topics

Your Hacknet farm and server hacking can quickly generate a large amount of
passive income. In this chapter, you will explore a game mechanic that can
provide a huge sum of money within a decent amount of time. Finally, the chapter
will help you to automate a particular aspect of the game.

## Coding Contracts

[Coding Contracts](https://bitburner-official.readthedocs.io/en/latest/basicgameplay/codingcontracts.html)
(or CCT) are programming problems. Every 10 minutes there is 25% chance for a
CCT to spawn on a random world server. Correctly solving a CCT would grant you a
random reward. The reward can be faction reputation, company reputation, or
money. Rewards are random and decided at creation time, but generally follow
these rules:

-   _Money._ A CCT would reward only money if you are not working for a company
    and you are not a member of any faction. Early in the game, the money you
    gain from a CCT is immensely useful to help you upgrade the `home` server,
    purchase servers, or buy programs via the dark web. To ensure that all
    generated CCTs reward money, do not work for any company (quit any job as
    necessary) and refrain from joining any faction.
-   _Faction reputation._ A CCT can reward you with reputation within a faction
    to which you belong. If you hold membership in multiple factions, there is a
    chance that your reputation reward would be split evenly among all factions
    to which you belong. When grinding reputation for a specific faction, ensure
    you join only that particular faction and you have quit your job at any
    company you are working for. Unlike companies, you cannot quit your
    membership of a faction, and must either soft reset or use `b1t_flum3.exe`
    to quit your membership of any faction.
-   _Company reputation._ A CCT can reward you with reputation within a company
    for which you work. Unlike faction reputation, company reputation is always
    rewarded for one specific company. You can be an employee of multiple
    companies. However, if a CCT rewards you with company reputation, then the
    total reputation points would be for one and only one specific company. When
    grinding reputation within a particular company, ensure you are an employee
    of that specific company and not hold a job at another company, and do not
    join any faction.

Use the
[CCT API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.codingcontract.md)
to help you automate various aspects of this game mechanic. The namespace of the
API is `ns.codingcontract.functionName()`, not
`ns.CodingContract.functionName()`. Here is a list of CCT problems:

1. _Find Largest Prime Factor._ Determine the largest prime factor of an
   integer. The problem boils down to obtaining the
   [prime factorization](https://en.wikipedia.org/wiki/Integer_factorization) of
   an integer.
1. _Subarray with Maximum Sum._ This is the
   [maximum subarray problem](https://en.wikipedia.org/wiki/Maximum_subarray_problem),
   where empty subarrays are not permitted as solutions. Your task is to
   determine a non-empty, contiguous subarray that has the largest sum and
   output that sum.
1. _Total Ways to Sum._ How many different ways can a positive integer $n$ be
   written as a sum of at least two positive integers? The problem is
   essentially that of determining the
   [partition number](<https://en.wikipedia.org/wiki/Partition_function_(number_theory)>)
   of $n$. You must subtract 1 from the partition number because the partition
   number includes $n$ itself as a solution.
1. _Total Ways to Sum II._ How many ways can an integer be partitioned using
   only numbers from a given array? This is a special case of the previous
   problem.
1. _Spiralize Matrix._ Output the elements of a 2-D matrix in spiral order,
   following clockwise direction. You might find
   [this animation](https://www.educative.io/answers/spiral-matrix-algorithm)
   useful.
1. _Array Jumping Game._ An array has integer elements. Each element specifies
   the maximum number of array cells to jump from that element. Starting from
   the first array cell, determine whether you can reach the last array cell.
1. _Array Jumping Game II._ Same as _Array Jumping Game_, but you must determine
   the minimum number of jumps to reach the end of an array.
1. _Merge Overlapping Intervals._ Merge any overlapping intervals. Output your
   result in ascending order.
1. _Generate IP Addresses._ Given a string of digits, determine all valid IPv4
   addresses.
1. _Algorithmic Stock Trader I._ You have an array $p$ of stock prices, where
   $p_i$ is the price of a stock on day $i$. All prices relate to the same
   stock. Suppose you are allowed one transaction, i.e. you can buy once and
   sell once. Determine the maximum profit you can make.
1. _Algorithmic Stock Trader II._ Given an array of stock prices, determine the
   maximum profit to be made if you are allowed an unlimited number of
   transactions.
1. _Algorithmic Stock Trader III._ Given an array of stock prices, maximize your
   profit but use at most two transactions.
1. _Algorithmic Stock Trader IV._ Given an array of stock prices, maximize your
   profit but use at most $k$ transactions.
1. _Minimum Path Sum in a Triangle._ Descend a triangle of numbers from top to
   bottom, taking a path of minimum sum.
1. _Unique Paths in a Grid I._ Determine the number of unique paths in an
   $m \times n$ grid. You start at the top-left square and find a path to the
   bottom-right square. Each step must be either down or right.
1. _Unique Paths in a Grid II._ Similar to _Unique Paths in a Grid I_, but now
   the grid has a number of obstacles. Calculate the number of paths from the
   top-left square to the bottom-right square. Each path must not pass through
   an obstacle.
1. _Shortest Path in a Grid._ Construct a shortest path from the top-left square
   of a grid to the bottom-right square.
1. _Sanitize Parentheses in Expression._ Remove the minimum number of
   parentheses so that the parentheses in the resulting expression are balanced.
   Multiple solutions are possible.
1. _Find All Valid Math Expressions._ Given a string of decimal digits and a
   target number, determine all valid mathematical expressions, each of which
   evaluates to the given target.
1. _HammingCodes: Integer to Encoded Binary._ Use an extended version of Hamming
   code to encode an integer. The encoded message must have an overall parity
   bit. You might find [this video](https://youtu.be/X8jsijhllIA) useful as well
   as [this animation](https://harryli0088.github.io/hamming-code/), but they
   cover the basic Hamming code not the extended Hamming code required by this
   CCT.
1. _HammingCodes: Encoded Binary to Integer._ Decode a binary string that has
   been encoded using the extended version of Hamming code from the previous
   problem.
1. _Proper 2-Coloring of a Graph._ The problem is equivalent to determining
   whether a graph is
   [bipartite](https://en.wikipedia.org/wiki/Bipartite_graph).
1. _Compression I: RLE Compression._ Determine the
   [run-length encoding](https://en.wikipedia.org/wiki/Run-length_encoding) of a
   string of characters.
1. _Compression II: LZ Decompression._ Use a variant of the Lempel-Ziv algorithm
   to decompress a data string. You might find
   [this video](https://youtu.be/goOa3DGezUA) useful.
1. _Compression III: LZ Compression._ Use a variant of the Lempel-Ziv algorithm
   to compress a data string.
1. _Encryption I: Caesar Cipher._ You are given a string of alphabetic
   characters and an integer $k$ that determines the number of left shifts. Use
   [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) to encode the
   string with the given left shift value.
1. _Encryption II: Vigenère Cipher._ You are given a string of alphabetic
   characters and a keyword. Use
   [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) and the
   given keyword to encode the string.

> **Problem 1.** Write a script to solve each CCT. You might want to write one
> script to solve a specific CCT, rather than a script that can solve all CCTs.
>
> **Problem 2.** Write a script to help you find CCTs on world servers. Launch
> the appropriate solution script to solve a particular CCT that you find.

## Path to a server

Browsing through the chapter [_Faction progression_](faction.md) and you see
that various factions require you to install a backdoor on their respective
servers. You do not yet have access to the
[Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md),
meaning that you must manually connect to a target server to install a backdoor.
If you have the program `AutoLink.exe`, you can use it together with the command
`scan-analyze` to help you connect to a target server. However, some servers are
buried deep inside the network of world servers such that you must use a chain
of `scan-analyze` commands to help you locate a target server. The process is
time-consuming. Let's find a way to automate the task of connecting to any world
server.

The problem can be described as follows. You are at your `home` server. You want
to find a path that allows you to connect to a target server. While you are at
it, you might as well find a shortest path to the target server. You can
certainly use the searching algorithms described in the chapter
[_After the first reboot_](reboot.md) to help you locate a path to a target
server. However, note that breadth-first search and depth-first search by
themselves do not always produce a shortest path.
[Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) is
a common technique to find a shortest path in a network. Dijkstra's algorithm is
similar to breath-first search. The algorithm keeps track of the distance from
the source node $s$ (e.g. your `home` server) to any node visited so far. When
visiting each neighbour $v$ of a node $u$, Dijkstra's algorithm compares the
previously calculated distance $d_v$ from $s$ to $v$, with the distance
$d_u + 1$ from $s$ to $u$ then to $v$. If the value of $d_u + 1$ is less than
$d_v$, then you have found a shorter path from $s$ to $v$. The procedure is
described in pseudocode below.

```js
// Dijkstra's algorithm to find a shortest path from a source node to each node
// in a network.  Assume the network is connected, i.e. each node in the network
// can be reached from the source node.
//
// INPUT: The starting node s, called source or root.  Start your scanning from
//     this node.
// OUTPUT: An array [d, p] as follows:
//     d := A map of the shortest number of nodes in a path to a target node.
//         Each path starts from the given source node.  For example, d[i] gives
//         the shortest number of nodes in a path from the source node to node i.
//     p := A map of the node preceding a given node, in a shortest path.  For
//         example, p[i] gives a node that directly connects to node i, where
//         p[i] precedes i.
//
1.  d := empty map
2.  p := empty map
3.  // Initialization.
4.  d[i] := infinity for each node i in the network
5.  p[i] := null for each node i in the network
6.  q := array of all nodes in the network
7.  d[s] := 0    // The distance from the source node to itself is zero.
8.  p[s] := null // Start from s so there are no nodes before s.
9.  add s to the end of q
10. // Search for shortest paths from the source node to other nodes.
11. while q is not empty
12.    u := node from q such that d[u] is minimal
13.    remove u from q
14.    neigh := all neighbours v of u such that v is in q
15.    for each v in neigh
16.        t := d[u] + 1
17.        // Found a shorter path to v.
18.        if t < d[v]
19.            d[v] := t
20.            p[v] := u
21. return [d, p]
```

Suppose you have implemented one of the above algorithms to find a (shortest)
path from your `home` server to a target server. You still require a way to make
the game connect you to the target server. From the terminal, use the command

```sh
$ connect [serverName]
```

to connect to a neighbour server. If you know a path of servers that lead to the
target server, chain a bunch of these `connect` commands at the terminal. Your
script might print this chain of `connect` commands, you copy and paste the
commands to the terminal, and press the <kbd>Enter</kbd> key to bring you to the
target server. There is a way to automate this process by simulating terminal
input.

The
[official documentation](https://bitburner-official.readthedocs.io/en/latest/netscript/advancedfunctions/inject_html.html)
has the template code shown below to help you simulate terminal input.

```js
// Simulate terminal input.
const input = globalThis["document"].getElementById("terminal-input");
// Replace "command" with your chain of terminal commands.  For example:
//
// input.value = "connect n00dles; analyze";
input.value = command;
const handler = Object.keys(input)[1];
input[handler].onChange({
    target: input,
});
input[handler].onKeyDown({
    key: "Enter",
    preventDefault: () => null,
});
```

Note the line `input.value = command;`. You replace `command` with a string that
contains a chain of terminal commands. Have your script format a path to a
target server as a chain of terminal commands. Save the chain of commands as a
string, insert this string at the appropriate place in the above template code,
and run your script. Here is an [example script](script/terminal.js).

> **Problem 1.** Use the above code template to create a script that connects to
> a neighbour server of `home`.
>
> **Problem 2.** Extend the breath-first (or depth-first) search algorithm to
> create a path from `home` to any target server. Format the path as a chain of
> terminal commands and use the above code template to help you connect to the
> target server.
>
> **Problem 3.** Modify your script from the previous exercise to use Dijkstra's
> algorithm.

[[TOC](README.md "Table of Contents")] [[Previous](stock.md "Stock market")]
[[Next](daemon.md "Find the daemon")]

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
