# Find the daemon

You should have joined the faction Daedalus and purchased the Augmentation
`The Red Pill` (or TRP). Install the Augmentation to soft reset and a new server
called `w0r1d_d43m0n` would appear. This is the very last server to which you
should gain root access. You must satisfy the following requirements to gain
root access to `w0r1d_d43m0n`:

1. Have at least 3000 Hack.
1. Open 5 ports on the server.

Obtain root access to `w0r1d_d43m0n`, then manually hack it from the terminal:

```sh
$ hack
```

A successful hack would result in the game presenting you with a world map. Each
location on the map is called a _BitNode_, a simulated world most aspects of
which are governed by various multipliers. Some multipliers affect the
difficulty of hacking a server, how much money you can make from various
activities, the amount of XP you gain from certain tasks, etc. You have been
playing in a BitNode called `BitNode-1: Source Genesis`, abbreviated as BN1. You
have now completed level 1 of BN1, shortened as BN1.1. Your reward is a
permanent increase of 16% in all your multipliers and your `home` server now
starts with 32GB RAM after entering a new BitNode. If you want, you can enter
BN1 again to play through BN1.2 and complete it to permanently increase all your
multipliers by 24%. Details on all BitNodes can be
[found here](https://bitburner-official.readthedocs.io/en/latest/guidesandtips/recommendedbitnodeorder.html).

## What's next?

After BN1.1, the next BitNode you should enter is `BitNode-4: The Singularity`
to gain access to the
[Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md).
The API allows you to automate most actions in the game that you have been
performing manually. After entering BN4.1, most of your progress would be reset
but you would now have Level 1 of `Source-File 1: Source Genesis`. Your money
would be reset to $1k, each of your stats would be at 1, your `home` server
would have 32GB RAM instead of the previous default of 8GB RAM, and you keep all
your scripts. The effect is as if you started the game all over again without
Augmentations and you must work your way up again by raising your money and
stats.

In BN4.1, raise your Hack stat and money. While waiting for your Hack stat and
money to increase, browse through the
[Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md)
to get an idea of which tasks you can now automate via scripts. Solve a couple
of
[Coding Contracts](https://bitburner-official.readthedocs.io/en/latest/basicgameplay/codingcontracts.html)
to earn money. Join factions and buy their Augmentations. Raise your stats,
especially your Hack, and money. Join Daedalus and raise your reputation high
enough to allow you to purchase TRP. Install TRP, then hack the `w0r1d_d43m0n`
server to break BN4.1.

After destroying BN1.1 and BN4.1, you can destroy the remaining BitNodes in any
order you want. For a more structured approach, you might want to first destroy
BitNodes that have Source-Files that permanently increase some of your stats by
various multipliers. For example, destroy BN1.2 to increase all of your stat
multipliers by 24% and then destroy BN1.3 to increase all of your stat
multipliers by 28%. Refer to
[this page](https://bitburner-official.readthedocs.io/en/latest/guidesandtips/recommendedbitnodeorder.html)
for recommendation on which BitNodes to destroy. Below is a recommended order,
assuming that you destroy the same BitNode three times before moving to a
different BitNode.

1. `BitNode-1: Source Genesis`. Destroy BN1.3 to raise all of your stat
   multipliers by 28%.
1. `BitNode-4: The Singularity`. This BitNode unlocks the
   [Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md),
   each of whose functions incurs a huge RAM cost. The RAM cost of each
   Singularity function is only noticeable if you have destroyed only BN4.1 and
   you are in a BitNode other than BN4.x. For example, suppose you have only
   destroyed BN4.1 and you now move to BN1.x. Write a script that uses a few
   Singularity functions and you would notice that the script costs a huge
   amount of RAM, possibly several 100GB. Destroy all 3 levels of BN4 to ensure
   the RAM cost of each Singularity function is at its minimum. Refer to the
   chapter [_BitNode-4: The Singularity_](singularity.md) for more detail.
1. `BitNode-5: Artificial Intelligence`. This BitNode unlocks a new stat called
   [Intelligence](https://bitburner-official.readthedocs.io/en/latest/advancedgameplay/intelligence.html).
   The stat is permanent. Its value persists across soft reset and across
   BitNodes. Your Intelligence stat can only increase or stagnate, but never
   reset to 0. Intelligence boosts various game actions such as hacking,
   committing crimes, or earning faction reputation. A higher Intelligence stat
   provides a higher boost, but levelling up Intelligence can be painfully slow.
   Most actions you perform via the
   [Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md)
   give you Intelligence XP. Destroy all 3 levels of BN5 and you would be
   rewarded with 14% boost to all your hack-related multipliers.
1. `BitNode-2: Rise of the Underworld`. This BitNode unlocks a game mechanic
   that allows you to create a gang. Your gang can be a valuable source of
   income, far outstripping most of your sources of income so far. Most, but not
   all, Augmentations can be purchased from the faction in which you created
   your gang. Some Augmentations remain exclusive to various factions. Only a
   small number of factions allow you to create a gang. In BN2, you can create a
   gang as soon as you join a faction that supports gang creation. In other
   BitNodes, you encounter an additional requirement to creating your gang.
   Destroy all 3 levels of BN2 and you would be rewarded with 42% boost to
   multipliers related to your crime success rate, the money you make from
   committing crimes, and Charisma.
1. `BitNode-12: The Recursion`. This BitNode has an infinite number of levels.
   Destroying each level of the BitNode would reward you with the corresponding
   level of `NeuroFlux Governor` (or NFG). For example, completing BN12.1 would
   allow you to start a new BitNode with level 1 of NFG, destroying BN12.2 and
   you would start a BitNode with level 2 of NFG, etc. The only reason for
   playing this BitNode is to give yourself a little bit of advantage when you
   enter other BitNodes. For now, aim to destroy at least BN12.1, but destroying
   a minimum of BN12.5 is recommended. Destroy another level of this BitNode
   anytime you want an extra little boost to your stats.
1. `BitNode-3: Corporatocracy`. You will unlock a game mechanic that allows you
   to create a corporation. Properly managed, your corporation can be the best
   source of passive income in the game. A corporation is more difficult to
   manage than a gang. In BN3.1, BN3.2, and BN3.3 you start with a subset of the
   [Corporation API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.corporation.md)
   and you must purchase access to the rest of the API. Destroying BN3.3 would
   permanently unlock the full API, in addition to granting you 14% boost to
   multipliers that affect your Charisma stat and company salary. In BN3, you
   can get a loan of $150b to create your corporation, but this option is not
   available in other BitNodes so you must rely on some other means of raising
   $150b. The money generated by your gang, and other sources of income, can
   help to kickstart your corporation in a BitNode other than BN3.
1. `BitNode-10: Digital Carbon`. This BitNode unlocks a technology called
   Duplicate Sleeve, abbreviated as sleeve. A sleeve is like a digital carbon
   copy of your avatar. It can perform a number of tasks that your avatar can
   do. Depending on the state of a sleeve, you share in 100% or a smaller
   percentage of the XP that a sleeve earns. Destroy all 3 levels of this
   BitNode to unlock 3 sleeves at no cost. You can purchase 5 additional sleeves
   and have a total of 8 sleeves. The cost of buying the next sleeve is more
   exorbitant than the previous purchase. Your gang and corporation can easily
   finance your spending spree. Your 8 sleeves can help you to satisfy the
   requirements for creating a gang in a BitNode other than BN2.

## Destroy the daemon

Here are some ways to destroy a BitNode:

1. In some BitNodes, the only way is to purchase TRP from Daedalus, then
   manually hack (or install a backdoor on) the `w0r1d_d43m0n` server. You must
   first connect to `w0r1d_d43m0n`, then manually hack or backdoor.
1. If you have access to the
   [Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md),
   you can use the function
   [`ns.singularity.installBackdoor()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.installbackdoor.md)
   to destroy `w0r1d_d43m0n` via a script. Similar to the previous method, you
   must first connect to `w0r1d_d43m0n` for the backdoor function to work.
1. After unlocking the ability to create a gang, you can purchase TRP from the
   faction in which you created your gang. This can only be done in
   `BitNode-2: Rise of the Underworld`. In other BitNodes, you cannot buy TRP
   from your gang faction.
1. Destroy `BitNode-6: Bladeburners` and `BitNode-7: Bladeburners 2079` for
   permanent access to a game mechanic called Bladeburner. Bladeburner has
   various tasks, each of which is more difficult than the previous ones. The
   most difficult task of all is destroying the `w0r1d_d43m0n` server.
   Bladeburner offers another, possibly quicker, way of destroying a BitNode.

[[TOC](README.md "Table of Contents")]
[[Previous](misc.md "Miscellaneous topics")]
[[Next](singularity.md "BitNode-4: The Singularity")]

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
