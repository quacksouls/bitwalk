# BitNode-4: The Singularity

Progressing in BN4.1, and indeed in BN4.2 and BN4.3, is more difficult than in
BN1. The difficulty is due to the following:

1. Experience points for all stats are significantly reduced. In effect, you
   require a longer period of time to gain a certain amount of Hack XP than when
   you were in BN1.
1. Most sources of income reward you with significantly less money as compared
   to BN1. You require more time to accumulate a certain amount of money to buy
   Hacknet nodes, servers, or programs available on the dark web.

Destroying BN4.1 would grant you access to the
[Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md).
Note that the namespace of the Singularity API is
`ns.singularity.functionName()`, not `ns.Singularity.functionName()`. Ensure you
destroy BN4.3 to bring the RAM cost of each API function down to its lowest. The
API allows you to automate most aspects of the game that previously required
point-and-click and/or entering commands from the Terminal. Indeed, you can
automate the game play from the start of a BitNode all the way up to and
including the destruction of the `w0r1d_d43m0n` server. Below is a list of some
aspects of the game that you can now automate.

1. Study at a university. The free Computer Science course at universities in
   various cities can help to raise your Hack stat, especially after you have
   installed a bunch of Augmentations or you start all over on another BitNode.
   Study the free course until your Hack stat has reached a certain amount, then
   you can quit to focus on something else.
1. Work at a company. There are various benefits to working at a company. You
   would earn XP that can raise your Hack and Charisma stats, in addition to
   earning money and reputation points. Some factions require you to earn a
   particular amount of reputation points within a company prior to receiving an
   invitation. Even if you do not need to work at a company in order to join a
   faction, working for a company is an effective way of raising your Charisma,
   Hack, and money. Every once in a while, apply for a promotion to earn even
   more XP and money per second. A business job usually pays more per second
   than an IT, software, or security job.
1. Work for a faction and purchase Augmentations. Being a member of a faction is
   the only way to purchase Augmentations. Some factions have Augmentations that
   can only be purchased from those particular factions and not from any other
   factions. Working for a faction is an effective way of raising your Hack and
   combat stats. Hacking contracts usually raise your Hack stat, whereas field
   work raises your Hack and combat stats. Performing field work for a faction
   is an effective way to raise your combat stats.
1. Commit crimes. After a soft reset or when you have moved to a new BitNode,
   your stats and money are low. Crimes are an early source of income and a way
   to raise your combat stats. Committing crimes would lower your karma. As part
   of their pre-requisites for sending an invitation, some factions require you
   to have a certain amount of negative karma and commit particular crimes.
1. Work on a program or purchase it via the dark web. Certain programs are
   available to be worked on as soon as your Hack stat reaches a particular
   minimum amount. If you have a lot of money to spare, purchase a Tor router
   and buy various port opener programs via the dark web.
1. Connect to a server in order to install a backdoor. Various factions require
   you to install backdoors on a number of servers. It is tedious to manually
   connect to a target server and then manually install a backdoor. The
   Singularity API provides functions that allow you to connect to servers and
   backdoor them.
1. Upgrading the Cores and RAM on your `home` server. Successfully breaking
   BN4.1 would grant you access to the Singularity API. However, each function
   from the API has a high RAM cost. You must destroy BN4.2 and BN4.3 to
   significantly reduce the RAM cost of using the API. The RAM cost of the API
   is highest after destroying BN4.1. Consequently, you require a huge amount of
   RAM on your `home` server to use the API to help you automate various aspects
   of the game. Even after destroying BN4.3 and the RAM costs of API functions
   are at their lowest, having an upgraded `home` server would allow you to run
   numerous scripts in the background.
1. Travel to various locations. Many factions require you to relocate to various
   cities. Having a way to automate your travel can save you a huge amount of
   time and manual work. Use the function
   [`ns.singularity.travelToCity()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.traveltocity.md)
   to travel to a different city. The function
   [`ns.singularity.goToLocation()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.gotolocation.md)
   allows you to go to a different place within the same city.
1. Destroy the `w0r1d_d43m0n` server. A manual destruction of the `w0r1d_d43m0n`
   server requires you to have the required minimum Hack stat and root access on
   the server. From the Terminal you navigate to the server, then run the
   following command:

    ```sh
    $ hack
    ```

    Running the command
    [`backdoor`](https://bitburner-official.readthedocs.io/en/latest/basicgameplay/terminal.html#backdoor)
    from the Terminal also works. For a scripted destruction, use the function
    [`ns.singularity.destroyW0r1dD43m0n()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.destroyw0r1dd43m0n.md).
    This function requires two arguments:

    - The next BitNode you want to enter once the server is successfully
      destroyed.
    - The script to launch after you have entered the new BitNode.

    If you want to destroy the `w0r1d_d43m0n` server and manually choose the
    next BitNode to enter, the following functions would not produce the desired
    result:
    [`ns.hack()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.ns.hack.md)
    and
    [`ns.singularity.manualHack()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.manualhack.md).
    You must install a backdoor on the server for the desired effect to take
    place, i.e. use the function
    [`ns.singularity.installBackdoor()`](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.installbackdoor.md).

[[TOC](README.md "Table of Contents")] [[Previous](daemon.md "Find the daemon")]
[[Next](intelligence.md "BitNode-5: Artificial Intelligence")]

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
