# Introduction

Bitburner is a programming game. You can get through the game with a minimum
amount of programming and by using other players' scripts. Here are some popular
repositories of scripts for playing the game:

1. [alainbryden](https://github.com/alainbryden/bitburner-scripts)
1. [xxxsinx](https://github.com/xxxsinx/bitburner)

Are you new to programming or do you want to refresh your programming knowledge?
The tutorial
[_Learn you some JavaScript for fun_](https://github.com/quacksouls/lyf) uses
Bitburner to help you learn basic programming skills you need to play the game.

Bitburner is also an
[incremental game](https://en.wikipedia.org/wiki/Incremental_game). Your overall
objective can be summarized as: make the numbers go up rapidly. To fulfil the
objective, you write JavaScript programs that accomplish the following:

1. Increase your stats. Your stats directly affect how fast you can increase
   your income.
1. Increase your money. You need money and a massive amount of it to purchase
   equipment that allows you to make even more money.
1. Purchase equipment that boost the rate at which your stats and money
   increase. These stats-enhancing equipment generally grant a temporary boost.
1. Complete specific goals that reward you with permanent boosts to your stats
   or permanently grant you ways to make more money.
1. Rinse and repeat the above.

The above captures the essence of the gameplay loop.

Finally, Bitburner is a sandbox game. While the game presents you with some
basic objectives to fulfil, you are free to make up your own goals. Play the
game in any way you want.

## Tips

Below are various tips you might want to keep in mind while playing the game.

1. _Do the tutorials._ Complete the in-game tutorial, followed by the
   [online tutorial](https://bitburner-official.readthedocs.io/en/latest/guidesandtips/gettingstartedguideforbeginnerprogrammers.html).
1. _Read the API documentation._ Read or browse the
   [API documentation](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.ns.md)
   to get an idea of what you can do.
1. _Use NS2._ The programming languages for playing the game are NS1 and NS2.
   NS1 uses ECMAScript 5, a specification for JavaScript that was published
   in 2009. NS2 uses ECMAScript 6, which is a JavaScript specification that was
   published in 2016. Scripts written in NS2 generally run faster than their NS1
   counterparts. Apart from speed, you should use NS2 to take advantage of most
   functionalities that modern JavaScript has to offer.
1. _Checking on your progress._ Save the game and exit. Load the game the next
   day to check on your progress. You do not need to have the game running 24
   hours a day. If you are not in the habit of leaving your game running 24/7,
   you might need to write your scripts to take care of the case where you
   reload your game. Depending on your in-game settings, reloading your game
   might or might not reload any scripts that were running prior to the game
   exit. Setting the game to reload scripts following a game reload means that
   each script would be re-run like it was running the first time, i.e. starting
   from the `main()` function. It might be easier to write your scripts with the
   assumption that your game would be running 24/7, but not everyone is able to
   leave their computer running 24/7.
1. _Separation of concern._ Unless you know what you are doing, avoid the urge
   to have a library file that contains all your classes and utility functions.
   To help you easily maintain and expand your library of code, have each class
   be in its own file. Utility functions should be in separate files, organized
   according to functionality or API or some other criteria. For example, have a
   library file that contains utility functions related to Coding Contracts,
   another library file holding utility functions related to Singularity, etc.
1. _Keep an eye on RAM usage._ The game penalizes you for importing a class that
   uses many functions from its API. This means that all API functions called by
   the class are used to calculate the total RAM cost of the script that imports
   the class. You want a balance between the code size of your class and total
   RAM cost used by the class. Another option is to create a file of utility
   functions and import any functions you need early in the game when the RAM of
   your `home` server is low. When the RAM of your `home` server is high enough,
   use your library classes.
1. _Automate everything._ The
   [Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md)
   is key to automating most aspects of the game. Note that every aspect of the
   game play can be automated. Some portions of the game play is more easily
   automated than others. Early in the game, you do not have access to various
   APIs to help you easily automate your game play. With a little bit of
   knowledge in JavaScript and web development, you can use HTML injection to
   easily circumvent the manual game play early in the game. Or you can go the
   manual route and slog it out until you have access to the
   [Singularity API](https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.singularity.md).
1. _One save file, multiple platforms._ The game can be played
   [online](https://danielyxie.github.io/bitburner/) and via
   [Steam](https://store.steampowered.com/app/1812820/Bitburner/). You can
   export your save file from the Steam version and import the save file into
   the online version, and vice versa. This feature is useful whenever you need
   to test something without the risk of messing up your main game. For example,
   suppose the Steam version is the primary version you use to play the game.
   Export your save file to a directory somewhere, open the online version of
   the game, and import your exported save file into the browser version where
   you can test a new script. Note that the browser version of the game requires
   the browser to be constantly in focus. Do not minimize the browser that is
   running the online version of the game and ensure that the browser is not
   behind any other application windows.
1. _Functional code._ Write functional JavaScript code wherever you can. If you
   are not familiar with JavaScript, you might find this
   [online book](https://eloquentjavascript.net/) useful to help you learn the
   language. Functional JavaScript, or functional programming, might seem weird
   at first for anyone who is accustomed to procedural and/or object-oriented
   programming. Various tutorials are available online to help you get started
   on functional JavaScript. See for example
   [this tutorial](https://opensource.com/article/17/6/functional-javascript),
   [this book](https://github.com/getify/Functional-Light-JS), or
   [this blog](https://jrsinclair.com/).
1. _Tools of the trade._ As your library of scripts grow, you would benefit from
   using various tools to help you code and sanitize your scripts. First, use a
   formatter to automatically help you format your code in a consistent manner.
   You might find [Prettier](https://prettier.io/) useful for this purpose.
   Second, use a linter to sanitize your code and fix common errors.
   [ESLint](https://eslint.org/) is recommended. Third, you cannot use a
   JavaScript formatter or linter from within the in-game text editor. You would
   have to use an external text editor that allows you to integrate a formatter
   and linter. Try [Visual Studio Code](https://code.visualstudio.com/) because
   it allows you to integrate Prettier and ESLint. For those who prefer a
   command line driven approach, setup
   [npm](<https://en.wikipedia.org/wiki/Npm_(software)>) and use it to install
   Prettier and ESLint. So you use an external text editor to write/edit your
   scripts. You now face the problem of how to sync your scripts between your
   computer and the game. A simple solution is to copy from your external text
   editor and paste the code into the in-game text editor. Another option is to
   use an online code hosting provider such as [GitHub](https://github.com/).
   Save your scripts to GitHub and from the terminal of the game use the command
   [`wget`](https://bitburner-official.readthedocs.io/en/latest/basicgameplay/terminal.html#wget)
   to download a script into your game. Ask on the
   [Bitburner server of Discord](https://discord.com/invite/TFc3hKD) for more
   options.

[[TOC](README.md "Table of Contents")] [[Next](start.md "Starting out")]

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
