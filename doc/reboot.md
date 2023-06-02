# After the first reboot

You have installed your first batch of Augmentations, bought from CyberSec. Most
of your progress has been reset, but you get to keep the effects of all
Augmentations installed so far. All scripts you have saved on your `home` server
can still be found there. Let's start again, but this time with slightly better
stat multipliers.

## Reboot income and Hack farming

First things first. Let's restart your streams of passive income as per the
chapter [_Starting out_](start.md). Use the starting amount of $1k to purchase a
Hacknet node and let it generate passive income. While the Hacknet node is
running in the background, you need to upgrade your Hack stat. The simplest way
to do so is to take the course <kbd>Study Computer Science (free)</kbd> at
Rothman University, stopping when you have at least 10 Hack. You also need to
work at a company to supplement your passive income. Again, apply at and work
for FoodNStuff (or Joe's Guns if you want).

Second, follow the chapter [_First script_](script.md). Deploy your hack script
to the following servers: `n00dles`, `foodnstuff`, `sigma-cosmetics`,
`joesguns`, and any other servers to which you can gain root access. You might
need to commit crimes in The Slums to raise enough money to purchase the TOR
router and purchase various port opener programs via the dark web. All of the
above compromised servers can be directed to hack `n00dles`. If you so choose,
redirect the compromised servers to hack another common target such as
`foodnstuff` or `joesguns`. Your objective is to use a bunch of world servers to
target a low-level server as a means of increasing your Hack stat and generate
passive income. As your stat multipliers are still rather low, you might find it
more profitable to target `n00dles`, rather than `foodnstuff` or `joesguns`.

## Join Sector-12

Third, let's join another faction. You have already purchased and installed all
Augmentations from CyberSec. There is no need to join CyberSec again. You could
join CyberSec again if you want to level up the `NeuroFlux Governor`
Augmentation or perform hacking contracts to raise your Hack stat. However,
other factions also allow you to level up `NeuroFlux Governor`. This time
around, explore what the faction Sector-12 has to offer. The requirements to
receive an invitation from Sector-12 are:

1. Be in the city Sector-12. Do not travel to a different city.
1. Have at least $15m. You might want to commit crimes in The Slums to quickly
   raise this amount of money.

You can be a member of both CyberSec and Sector-12. While you work on hacking
contracts for Sector-12 you increase your reputation within the faction.
Simultaneously, you passively earn reputation within CyberSec, albeit rather
slowly. Let the game run until you have enough reputation points to unlock the
following Augmentations from Sector-12:

1. `Augmented Targeting I`
1. `Augmented Targeting II`
1. `Wired Reflexes`
1. `Speech Processor Implant`
1. `Neuralstimulator`
1. `CashRoot Starter Kit`

The `CashRoot Starter Kit` is useful because after a soft reset the Augmentation
would grant you $1m and the program `BruteSSH.exe`. It is worth waiting to
unlock and buy `CashRoot Starter Kit` from Sector-12.

## Automate Hacknet

Fourth, let's automate your farm of Hacknet nodes. If you have not already done
so, join the faction Sector-12. Perform hacking contracts for the faction to
raise your reputation within the faction. Share your `home` server with the
faction to boost the amount of reputation points you earn per second; refer to
the section [_Share_](program.md#share). As you passively farm reputation points
to unlock all Augmentations from Sector-12, think about various tasks that you
can automate. For example, you already have access to most functions in the
[Hacknet API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.hacknet.md).
(The namespace of the API is `ns.hacknet.functionName()`, not
`ns.Hacknet.functionName()`.) Why not write a script to automate the buying and
upgrading of your farm of Hacknet nodes?

Your Hacknet script does not need to be fancy at the moment. At the very least,
the script should automate the following tasks:

1. Purchase a small number of Hacknet nodes to setup your farm. Buy from 1 to 3
   nodes to start your farm, depending on your funds.
1. Setup a loop that occasionally performs the following tasks. The loop
   performs the listed tasks, then sleep for a minute or more. A shorter sleep
   interval would quickly burn through your limited money.
    - Purchase another Hacknet node if you have sufficient funds. Do not wait
      for sufficient funds to purchase a node. If you do not currently have
      enough money to buy a new node, move on to the next task.
    - Upgrade each node by 1 Level. It is OK if you cannot level up all nodes.
      Upgrade by 1 Level any node that you can. If your funds do not allow you
      to upgrade the Level of a node, move on.

For now, your Hacknet script does not need to do anything beyond the above
tasks. Why not upgrade the RAM and/or Cores of each node, too? Cores and RAM are
generally more expensive to upgrade than the Level of a node. Doubling the RAM
of a node or adding another Core to the node can have a higher return than
adding another Level to the node. By all means, have your script upgrade the RAM
and/or Cores as well. You might want a longer upgrade interval for RAM and/or
Cores than the interval for Level. The longer upgrade interval helps to prevent
the script from burning through all your money in a short amount of time. For
example, suppose your script attempts to upgrade the Level (of each Hacknet
node) every minute. Then you might want the script to try to upgrade the RAM
and/or Cores of each node every 10 minutes (or a longer time interval). Here is
an example [Hacknet script](script/hnet.js).

> **Problem.** Add code to the [Hacknet script](script/hnet.js) to upgrade the
> RAM and Cores of your Hacknet farm.

## Your first worm

Another fertile ground for automation is the nuking of servers and deploying
your hacking scripts on those servers. While waiting to unlock all Augmentations
from Sector-12, set yourself the task of writing a script that scans all servers
in the game world. When visiting a server, your script should automate the
following tasks:

1. _Have the necessary Hack stat._ Determine whether you have the minimum Hack
   stat required by the server.
1. _Open all ports._ Determine whether you have all programs necessary to open
   all ports on the server. You do not have to open all available ports, only
   the minimum number of ports required to enable you to nuke the server. In
   case you have the necessary programs, use them to open the required number of
   ports on the server. You want access to the TOR router in order to purchase
   port opener programs via the dark web. At the moment, you do not have access
   to the API that allows you to buy the TOR router and purchase programs. The
   latter two tasks must be done manually.
1. _Gain root access._ If you have the minimum Hack stat and have opened all
   required ports on the server, nuke the server to gain root access to it.
1. _Ignore special servers._ Various servers in the game world are special. For
   example, you might want to ignore purchased servers because these are servers
   you have bought and already have root access. See the section
   [_Purchased servers_](reboot.md#purchased-servers) for detail on purchased
   servers.

Essentially, your objective is to create a computer worm that scans for world
servers and attempts to gain root access to those servers. Two basic algorithms
for scanning a network are
[breadth-first search (BFS)](https://en.wikipedia.org/wiki/Breadth-first_search)
and
[depth-first search (DFS)](https://en.wikipedia.org/wiki/Depth-first_search).
The fundamental idea of BFS is to visit all neighbours of a server, then proceed
to visit the neighbours of the neighbours. The queue data structure is commonly
used in an implementation of BFS. Below is a description of the basic BFS
algorithm, written as pseudocode. The symbol `:=` means "assign". A line of
pseudocode like `a := 42` is read as: "Assign the number 42 to `a`".

```js
// Input: The starting node, called root. Start your scanning from this node.
// Output: Array of all nodes of a network. Each node is reachable from root.

1.  q := empty array
2.  visit := empty set
3.  add root to visit
4.  add root to end of q // enqueue
5.  while q is not empty
6.      u := first element of q // dequeue
7.      remove u from q
8.      for each neighbour v of u
9.          if v is not visited
10.             add v to visit
11.             add v to end of q // enqueue
12. return elements of visit as an array
```

On the other hand, the idea of DFS is to follow a chain of nodes as deep as
possible. When you cannot go any further, you backtrack and use the same
principle to visit other chains of nodes. The stack data structure is commonly
used in an implementation of DFS. The following is a description of the basic
DFS algorithm, written as pseudocode:

```js
// Input: The starting node, called root. Start your scanning from this node.
// Output: Array of all nodes of a network. Each node is reachable from root.

1.  s := empty array
2.  visit := empty set
3.  add root to visit
4.  add root to end of s // push root onto s
5.  while s is not empty
6.      u := last element of s // pop s
7.      remove u from s
8.      if u is not visited
9.          add u to visit
10.         for each neighbour v of u
11.             add v to end of s // push v onto s
12. return elements of visit as an array
```

Adapt BFS or DFS (or both) to create your computer worm. Keep your worm script
separate from the `hack.js` script. You want your worm script to: (a) handle all
the logic necessary to compromise a target server; and (b) figure out how many
threads can be used to run `hack.js` on a compromised server. Meanwhile your
script `hack.js` should contain the bare minimum code required to hack, grow, or
weaken a target server. The lower is the RAM required by `hack.js`, the more
threads you can use to run the script. Here is an
[example worm](script/worm.js), which depends on the hack script from the
section [First script](script.md).

> **Problem 1.** Use breath-first search to implement a worm script. Your worm
> should deploy your hack script to a nuked server. All servers nuked by your
> worm should run your hack script against a common target. The worm should
> ignore all purchased servers for now. Later on, you might want to write a
> script that specifically manages your purchased servers. The purpose of this
> exercise is to gain some experience in writing a manager script. There are
> better techniques for hacking a world server that can generate more money than
> the basic script `hack.js`. See the chapter
> [_Hack, grow, weaken (HGW)_](hgw.md) for more details.
>
> **Problem 2.** Rewrite your worm script to use a recursive version of
> depth-first search.
>
> **Problem 3.** Write a script to kill all scripts running on a world server.
> Exclude your `home` server as well as purchased servers. You might find such a
> script useful whenever you need to change the common target for your worm.
>
> **Problem 4.** If your worm targets `n00dles` or a low-level server of similar
> Hack stat requirement, you might not be generating as high income as you want.
> On the other hand, if your worm targets a server that can hold the highest
> amount of money (choosing from all compromised servers), you might find that
> it takes too long for the script to generate money. Servers that can hold a
> larger amount of money than `n00dles` usually require a higher Hack stat and
> have higher security levels than `n00dles`. A rule of thumb, due to
> [`xsinx#1018`](https://github.com/xxxsinx/bitburner) on the
> [Bitburner server](https://discord.com/invite/TFc3hKD) of Discord, is to rate
> (or assign a hack desirability score to) all servers. A world server not
> compromised receives a score of zero because you cannot steal money from a
> server to which you do not have root access. If a compromised server requires
> more than half of your current Hack stat, then the server receives a hack
> desirability score of zero as well. You are now left with compromised servers
> that have Hack stat requirements at most half of your Hack stat. The hack
> desirability score of each such server is defined as the maximum amount of
> money the server can hold divided by the minimum security level of the server.
> The hack desirability score of a server $s$ is encapsulated in the following
> weight formula:

```math
w(s)
=
\begin{cases}
0, & \text{if $s$ is not compromised}, \\[4pt]
0, & \text{if $h_s > h / 2$}, \\[4pt]
money_{max} / security_{min}, & \text{otherwise}.
\end{cases}
```

> Here $h_s$ is the server's Hack stat requirement, $h$ is your current Hack
> stat, $money_{max}$ is the maximum amount of money the server can hold, and
> $security_{min}$ is the smallest security level to which the server can be
> weakened. Use the above rule of thumb to direct your worm to hack a common
> target server.
>
> **Problem 5.** The servers that exist in the game world can be harnessed into
> a botnet for purposes other than hacking. Recall from the section
> [_Share_](program.md#share) that you can share the RAM of your `home` server
> with the faction for whom you are currently working. Sharing the RAM of a
> server with a faction can boost the rate at which you gain reputation points
> within that faction. In fact, you can share the RAM of any world servers you
> have nuked. Write a script to share the RAM of your botnet with a faction.

## Purchased servers

Purchased servers (or pserv) are like a boost to your role-play as a botnet
master. You buy powerful servers and pool their resources to hack a common
target. You have been using servers found on the network of the game world to
hack servers on the same network. Now that you have various sources of income,
you can purchase new servers and run your scripts on those purchased servers to
hack one or more servers in the game world. While you are waiting to unlock all
Augmentations from Sector-12, your goal should be to write a pserv script that
automates these tasks:

1. Purchase as many servers as possible. You can purchase a maximum of 25
   servers. Let your worm and Hacknet scripts generate passive income in the
   background, while you commit crimes in The Slums.
1. Copy your script `hack.js` over to each purchased server. Pool the resources
   of your purchased servers to hack a common target, preferably a low-level
   server that requires somewhere between 10 and 50 Hack stat. The server
   `joesguns` is a good first choice. As your purchased servers have more RAM,
   you might want all your purchased servers to target one of these servers:
   `nectar-net`, `hong-fang-tea`, `harakiri-sushi`, `neo-net`. When each of your
   purchased servers has RAM in the range of terabyte or even petabyte, you
   might want all purchased servers to target a higher level server. Another
   option is to let each purchased server target a different world server, but
   only do so when each purchased server has RAM in the realm of hundreds of
   terabytes or beyond. The above strategies are by no means optimal, but are
   simple ideas on how to implement your first pserv script.
1. Your pserv script must ensure that any server you want to target is already
   compromised. The computer worm described in the section
   [_Your first worm_](reboot.md#your-first-worm) is useful for compromising
   world servers. Your pserv script should not be searching for world servers to
   compromise, but rather piggybacking on the work of the worm script. In
   particular, the pserv script must ensure the following:
    - The target server is not a purchased server.
    - You have root access to the target server.
    - The target server is not bankrupt. A server is said to be bankrupt if the
      maximum amount of money it can hold is zero. Hacking a bankrupt server
      would not gain you any money, but instead raises your Hack XP.
    - Copy the script `hack.js` over to a purchased server.
    - Run the script on the purchased server and direct it to hack the target.
      Use as many threads as the RAM of the purchased server allows.

Keep your pserv script separate from the `hack.js` script. You want your pserv
script to handle all the logic necessary to choose a target server and deploy
your hack script against the target. Furthermore, your pserv script should
figure out how many threads can be used to run `hack.js` on a purchased server.
Meanwhile your script `hack.js` should contain the bare minimum code required to
hack, grow, or weaken a target server. The lower is the RAM required by
`hack.js`, the more threads you can use to run the script. Here is an example
[pserv script](script/pserv.js) that relies on the `hack.js` script.

The above exercise should provide you with more experience in writing a script
that manages a bunch of servers. The basic script `hack.js` is a good start for
generating some money, but it is by no means efficient at using the RAM of a
server. In the chapter [_Hack, grow, weaken (HGW)_](hgw.md), you will learn
various techniques that can generate more money than the basic script `hack.js`.

Why would you want to waste money to buy a server to do what can normally be
done by means of a world server? An answer to this question can be summarized
as: RAM. The servers you find in the game world usually have limited RAM. Some
world servers have 0GB RAM; you cannot run scripts on those servers. The maximum
amount of RAM a world server can have is $2^{11} = 2,048$ GB. Contrast that with
the maximum of $2^{20} = 1,048,576$ GB (or approximately 1.049PB) of RAM a
purchased server can have. A purchased server allows you to run your hack script
using an order of magnitude or more threads than any world server.

> **Problem 1.** Both of the [pserv](script/pserv.js) and [worm](script/worm.js)
> scripts need to scan the network of world servers. Refactor the relevant code
> from each script into a utility function called `network()` and store the
> function `network()` in a file, e.g. named `util.js`. Import the function
> `network()` into each of the pserv and worm scripts, and rewrite those scripts
> as necessary.
>
> **Problem 2.** Read through all your scripts so far to find blocks of code
> that can be refactored and moved to `util.js`. You do not want to duplicate
> the same block of code or functionality across multiple scripts.
>
> **Problem 3.** Write a pserv script to purchase servers. Direct all your
> purchased servers to hack the server of highest hacking requirement to which
> you have root access.
>
> **Problem 4.** Rewrite your pserv script to use the weight function described
> in the section [_Your first worm_](#your-first-worm).
>
> **Problem 5.** Sometimes you need to wipe out your pserv farm and start again
> with a clean slate. Write a script to delete all purchased servers.

## Second soft reset

Farm enough reputation points to unlock all Augmentations from Sector-12. You
might need to save up enough money to purchase all such Augmentations, excluding
`NeuroFlux Governor`. Use any left over money you have to upgrade the RAM of
your `home` server. Spend the rest on upgrading `NeuroFlux Governor` as high as
you can. Install the Augmentations to initiate your second soft reset.

[[TOC](README.md "Table of Contents")]
[[Previous](program.md "Programs and factions")]
[[Next](hgw.md "Hack, grow, weaken (HGW)")]

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
