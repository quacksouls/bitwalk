# Walkthrough plan

<!-- prettier-ignore -->
- [x] Hello, world!
  - Music provided by Millennials Melody Originals
    https://youtu.be/E5-GAkDmaQk
  - Work through the in-game tutorial.
  - Present the Bitburner environment.
  - Write the traditional "Hello, world!" program.

- [x] Starting out
  - Music provided by Millennials Melody Originals
    https://youtu.be/E5-GAkDmaQk
  - Buy 3 Hacknet nodes and let them generate some money.  Level each Hacknet
    node to 10.
  - Study the free computer science course at university.
  - Work at FoodNStuff.
  - Commit various crimes.  Use homicide to level up all combat stats.

- [x] Early hack script
  - Music provided by Millennials Melody Originals
    https://youtu.be/6fR_HTEoM7w
  - Buy 6 more Hacknet nodes.  Upgrade each node to Level 10.
  - Work for Carmichael Security, Software Job requires 75 Hack.
  - Write a basic hack script called `early-hack.js`.
  - Write a script called `early-deploy.js` that uses the script `early-hack.js`
    to let each of the following servers hack itself.  Each of these servers do
    not require any ports to be opened.
    - n00dles
    - foodnstuff
    - sigma-cosmetics
    - joesguns
    - hong-fang-tea
    - nectar-net
    - harakiri-sushi
  - Work in Software Job at Carmichael Security.
  - Need to save up some money to upgrade RAM of home server.

- [x] Upgrade home RAM
  - Music provided by Millennials Melody Originals
    https://youtu.be/45dIea0tfkg
  - Go to Alpha Enterprises.  Upgrade RAM of home server to at least 256GB RAM.
  - Use all RAM of home server to hack joesguns.  Need to first kill the script
    that is hacking joesguns.
  - Apply for promotion at Carmichael Security.

- [x] Scanner and botnet
  - Music provided by Millennials Melody Originals
    https://youtu.be/45dIea0tfkg
  - Go to Alpha Enterprises and buy the TOR router.
  - Use the dark web to buy all port opener programs.
  - Write a utility function to scan all servers in the game world.
  - Write a weight function to help us choose a server to target.
  - Write a hack manager `hgw/botnet.js` that automatically chooses a server to
    target.  Assemble a botnet and use it to hack the target.  This is similar
    to the script `early-deploy.js`, but we let all servers attack a common
    target.

- [x] Faction and share
  - Music provided by Millennials Melody Originals
    https://youtu.be/AnApQCFkvkA
  - Join the faction Sector-12.
  - Work for faction to raise reputation so you can purchase all of its
    augmentations.  The most important augmentation is `CashRoot Starter Kit`.
  - Write a script `kill-script.js` to kill all scripts running on world
    servers.  The script should exclude scripts running on home.
  - Upgrade home RAM to at least 512GB.  Write a script `share.js` to share home
    server with faction.
  - Write a script `faction/share.js` to share botnet with faction to boost
    reputation gain.
  - Purchase a 256GB server.  Write a script `hgw/joe.js` that uses the
    purchased server to hack joesguns.

- [x] Automate Hacknet
  - Music provided by Millennials Melody Originals
    https://youtu.be/TOgH_gXEI6k
  - Write a script `hnet.js` to automate the buying and upgrading of Hacknet
    nodes.
  - At most 9 Hacknet nodes.
  - Each node at most Level 50.
  - No need to upgrade RAM and Cores.
  - Now is a good time to start implementing some kind of logger.  Use the
    logger to log main events in your scripts.  Use the logger in `hnet.js`.
  - Purchase all augmentations from the faction Sector-12.
  - Upgrade home RAM as high as possible.
  - Purchase as many levels of Neuroflux Governor as possible.
  - Install the augmentations and soft reset.
  - Restart the script `early-deploy.js` for some passive income.

- [x] Farm Hack XP
  - Music provided by Millennials Melody Originals
    - https://youtu.be/kRuP_Y8xkdU
    - https://youtu.be/45dIea0tfkg
  - Join the faction Tian Di Hui.  Requirements are:
    - Travel to Chongqing, New Tokyo, or Ishima.
    - At least $1m.
    - At least 50 Hack.
  - Write a script `hgw/xp.js` to farm Hack XP from joesguns.
  - Use botnet to farm Hack XP from joesguns.

- [x] Parallel batcher
  - Music provided by Millennials Melody Originals
    - https://youtu.be/qlw6sapdsY0
    - https://youtu.be/OyvlMMg9J2g
    - https://youtu.be/vX_h8tAmoio
  - Buy the program `Formulas.exe` via the dark web.  Requires $5b.  Use one of
    the early hack managers to raise the money.
  - Buy as many port openers as possible.
  - Write a batching manager `hgw/batcher/cloud.js` to manage a farm of
    purchased servers, each running a parallel batcher.  The batcher requires
    `Formulas.exe`.
  - Write a script `kill-server.js` to delete all purchased servers.
  - Save up enough money and reputation to buy all augmentations from the
    faction Tian Di Hui.

- [x] Stock market trade bot
  - Music provided by Millennials Melody Originals
    - https://youtu.be/2ltsSlIdhtY
    - https://youtu.be/i43tkaTXtwI
  - Pre-4S
    - Spend $200m to purchase an account on the World Stock Exchange (WSE).
    - Spend $5b to purchase access to the Trade Information eXchange (TIX) API.
    - Write a trade bot `stock/pre4s.js` without access to 4S data and API.
  - Post-4S
    - Spend $1b to purchase access to 4S Market Data.
    - Spend $25b to purchase access to 4S Market Data TIX API.
    - Write a trade bot `stock/trade.js` with access to all data and APIs.

- [x] Shortest path and HTML injection
  - Music provided by Millennials Melody Originals
    - https://youtu.be/QdrCGXt6goU
    - https://youtu.be/2JvP0K529Pg
  - Purchase all augmentations from Tian Di Hui.
  - Find shortest path to a target server.
  - Write a script `connect.js` to simulate terminal input and connect to a
    target server.
  - Write a script `backdoor.js` to backdoor a target server.
  - Join the faction CyberSec.
    - Stay put in Sector-12.
    - At least 60 Hack.
    - Open at least 1 port on the server `CSEC`.
    - Install a backdoor on the server `CSEC`.

- [ ] Modified HUD
  - Modify the HUD to display custom data/text.
  - Write a script `hud.js` to display a custom HUD.

- [ ] Server table
  - Write a script `table.js` to display a table containing various information
    about each server.

- [ ] Coding Contracts (CCT)
  - Write a script to find CCTs.
  - Solve each CCT.

- [ ] Destroy the `w0r1d_d43m0n`
  - Should have joined the faction Daedalus and purchased the augmentation
    The Red Pill.  Install the augmentation to soft reset and a new server
    called `w0r1d_d43m0n` would appear.
  - Gain root access to `w0r1d_d43m0n`.  Requirements are:
    - Have at least 3000 Hack.
    - Open 5 ports on the server.
    - Connect to the server and run `NUKE.exe`.
  - From the terminal, run the terminal command `hack` to destroy the server.

- [ ] Gang manager
  - Automate the management of a criminal gang.

- [ ] Sleeve manager
  - Automate the management of your sleeves to farm XP for combat stats.

- [ ] Intelligence farm, part 1
  - Commit larceny.

- [ ] Intelligence farm, part 2
  - Visit different locations.
  - Do sleeves committing crimes increase Intelligence XP?

- [ ] Intelligence farm, part 3
  - Hack a server from the terminal.

- [ ] Intelligence farm, part 4
  - Use money from gang, trade bot, and batcher to farm Intelligence XP.
  - Buy and delete cheapest program.

- [ ] Bladeburner manager
  - Automate the management of Bladeburner to destroy a BitNode.

- [ ] Intelligence farm, part 5
  - Use Bladeburner to farm Intelligence XP.
