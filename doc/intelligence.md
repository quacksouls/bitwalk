# BitNode-5: Artificial Intelligence

[Intelligence](https://bitburner-official.readthedocs.io/en/latest/advancedgameplay/intelligence.html)
is a stat that is acquired as soon as you enter BN5.1. The stat remains with
your character provided that you destroy at least BN5.1. If you enter BN5.1,
then use the program `b1t_flum3.exe` to enter another BitNode without first
destroying BN5.1, you would lose the Intelligence stat. Destroying BN5.1 would
permanently add Intelligence to your character.

BitNode-5.1 grants you access to the program `Formulas.exe`. You no longer need
to purchase the program via the dark web or create the program. Similar to the
Intelligence stat, you must destroy at least BN5.1 to permanently unlock
`Formulas.exe` so you would have access to the program as soon as you enter
another BitNode. The program grants you access to the
[Formulas API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.formulas.md),
a set of functions that can be used to optimize various aspects of the game.

Intelligence affects various tasks in the game such as hacking, your success
rate in committing crimes, the rate at which you earn reputation within a
faction or company, etc. The higher is your Intelligence stat, the higher is the
boost to various tasks you perform. At the moment, grinding for Intelligence XP
is like losing a race against the slowest snail. The grind is slow and you are
better off playing the game and aim to destroy BN5.3. Destroying at least BN5.1
would grant you access to the function
[`ns.getBitNodeMultipliers()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.ns.getbitnodemultipliers.md)
and your hack-related multipliers would be raised by 8%. Completing BN5.3 would
boost your hack-related multipliers by 14%.

## How to increase Intelligence?

Most tasks that can be performed via the
[Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md)
grants you Intelligence XP. Use the following tasks to level up your
Intelligence stat. Do so via the Singularity API. For now, prioritize tasks that
do not require focus because performing such tasks would not cancel a task on
which you are focused.

1. 🐞 Study at a university. This is bugged since at least v2.0.2 so you would
   not gain Intelligence XP by studying at a university. This action requires
   focus. Use the Singularity function
   [`ns.singularity.universityCourse()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.universitycourse.md).
1. 📝 Manual hacking from the Terminal. How many Intelligence XP per hack? Does
   the XP vary depending on the server you are hacking? Use the command
   [`hack`](https://bitburner-official.readthedocs.io/en/latest/basicgameplay/terminal.html#hack)
   and possibly simulate Terminal input.
1. 📝 BladeBurner actions. Elaborate on this.
1. Joining a faction gives you 7.5 Intelligence XP. No focus required. Use the
   Singularity function
   [`ns.singularity.joinFaction()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.joinfaction.md).
1. Successfully purchasing an Augmentation would result in an Intelligence XP
   gain of 15 points per Augmentation. No focus required. Use the Singularity
   function
   [`ns.singularity.purchaseAugmentation()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.purchaseaugmentation.md).
1. Installing one or more Augmentations would net you 15 Intelligence XP. You
   receive the same Intelligence XP amount no matter how many Augmentations you
   install at the same time. No focus required. Use the Singularity function
   [`ns.singularity.installAugmentations()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.installaugmentations.md).
1. Travel to a different city results in an Intelligence XP gain of
   approximately 0.00003, rounded to 5 decimal places. No focus required. Use
   the Singularity function
   [`ns.singularity.travelToCity()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.traveltocity.md).
1. Move to another location within the same city. A successful relocation
   results in approximately 0.00003 Intelligence XP, rounded to 5 decimal
   places. If you use this function for the entirety of an hour, with 1 second
   delay in between calls, then you would gain approximately 0.001714
   Intelligence XP per minute, rounded to 6 decimal places. Requires focus. Use
   the Singularity function
   [`ns.singularity.goToLocation()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.gotolocation.md).
1. Purchasing the TOR router would result in approximately 0.003 Intelligence
   XP. No focus required. Use the Singularity function
   [`ns.singularity.purchaseTor()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.purchasetor.md).
1. Purchasing a program via the dark web would net you approximately 0.0003
   Intelligence XP. No focus required. Use the Singularity function
   [`ns.singularity.purchaseProgram()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.purchaseprogram.md).
1. Upgrading the Cores on your `home` server would result in a gain of 3
   Intelligence XP. No focus required. Use the Singularity function
   [`ns.singularity.upgradeHomeCores()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.upgradehomecores.md).
1. Upgrading the RAM on your `home` server would result in a gain of 3
   Intelligence XP. No focus required. Use the Singularity function
   [`ns.singularity.upgradeHomeRam()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.upgradehomeram.md).
1. Destroying a BitNode yields 300 Intelligence XP. No focus required. Use
   either of the the Singularity functions
   [`ns.singularity.destroyW0r1dD43m0n()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.destroyw0r1dd43m0n.md)
   or
   [`ns.singularity.installBackdoor()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.installbackdoor.md).

## Create a program

> 📝 Obtain the data again, but always focus on the web browser.

Creating a program requires focus. You must focus on one task and not initiate
another task. The table below lists the Intelligence XP gained from creating
various programs, both via the Singularity API and manually. Data were obtained
using the online version of the game, not the Steam version. The numbers in the
column `Int XP, scripted` were obtained by using the Singularity API to create
programs. The numbers in the column `Int XP, manual` were obtained by manually
creating programs. Each number in a column is the average of 10 runs of creating
a particular program. Two copies of the same save file were used, each save
starts the player at BN1.3 and the following:

1. At least 152 Intelligence. The starting value for Intelligence varies because
   one program was created after another. Refer to the given save files for the
   exact values.
1. Source-File -1: Exploits in the BitNodes, Level 4
1. Source-File 1: Source Genesis, Level 3
1. Source-File 4: The Singularity, Level 3
1. Source-File 5: Artificial Intelligence, Level 3

[Here are](../../data/program/intelligence/) the exact save files used. Refer to
[this file](../../data/program/intelligence/README.md) for the process used to
obtain the raw data.

While obtaining the data below, all stats were kept at the base value of 1,
except for Hack and Intelligence. The only source of income was via hacking
servers in the game world. Where possible, a world server was used to hack
itself. Purchased servers were used to hack world servers. Apart from being the
only source of income, hacking world servers was also the main avenue of
increasing the Hack stat. Initially, the free Computer Science course at Rothman
University was used to raise the Hack stat to at least 100.

| Program              | Int XP, scripted | Int XP, manual |
| -------------------- | ---------------: | -------------: |
| `AutoLink.exe`       |          127.364 |        161.004 |
| `BruteSSH.exe`       |           86.406 |         86.378 |
| `DeepscanV1.exe`     |          125.008 |        125.402 |
| `DeepscanV2.exe`     |          642.316 |        605.114 |
| `FTPCrack.exe`       |          214.586 |        211.810 |
| `HTTPWorm.exe`       |          1273.54 |       1300.312 |
| `relaySMTP.exe`      |          520.892 |        522.060 |
| `ServerProfiler.exe` |          230.762 |        239.080 |
| `SQLInject.exe`      |         2852.946 |       2781.086 |

## Commit a crime

This also requires focus. Each data value was obtained by committing a crime for
one hour and divide by 60 minutes.

| Crime                 | Int XP / min. |
| --------------------- | ------------: |
| Assassination         |         0.325 |
| Bond forgery          |         1.180 |
| Deal drugs            |             0 |
| Grand theft auto      |         0.910 |
| Heist                 |         0.220 |
| Homicide              |             0 |
| Kidnap and ransom     |         0.260 |
| Larceny               |             1 |
| Mug someone           |             0 |
| Rob store             |         0.750 |
| Shoplift              |             0 |
| Traffick illegal arms |             0 |

## Passive farm

1. Write a script that does a particular action, sleep a short interval, then
   resume the action. Let the script run overnight. The action can involve focus
   or not. It does not matter as long as the action yields Intelligence XP. For
   example, commit a crime. Use the data from
   [this file](../../data/crime/README.md) to help you decide on the crime.
1. While you are trying to get through a BitNode, your script for farming
   Intelligence XP should not perform any action that involves focus. If your
   script performs an action that requires focus, then it would stop whatever
   action that was previously in focus, possibly breaking your automated
   playthrough a BitNode. Instead, your farming script should perform any of the
   actions listed above that do not require focus. For example, have your script
   run in the background and purchase one of the cheapest programs via the dark
   web. After purchase, immediately delete the program, sleep for a while, then
   purchase again. Rinse and repeat. Choose one of the programs that are not
   required to open a port on a world server. `DeepscanV1.exe` is recommended.
   Space out the interval between successive purchases, taking into account your
   current money. If you are low on money, purchase once every minute or so. In
   case you have cash to burn, purchase a batch of programs once every
   millisecond.
    > 📝 Data on Intelligence XP from purchasing programs.
1. Once you have unlocked all 8 sleeves, use them to commit crimes or other
   tasks. Sleeve actions do not require focus, hence should not interfere with
   your playthrough.
    > 📝 Data on Intelligence XP by letting sleeves perform various tasks.

[[TOC](README.md "Table of Contents")]
[[Previous](singularity.md "BitNode-4: The Singularity")]
[[Next](gang.md "BitNode-2: Rise of the Underworld")]

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
