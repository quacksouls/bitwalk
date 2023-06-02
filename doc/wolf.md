# BitNode-8: Ghost of Wall Street

In this BitNode, you will roleplay as a stock broker. The only viable means of
generating money is buying and selling shares of stocks. All other ways of
generating income would now produce zero money. The only exception is your gang,
which can still generate a minuscule amount of money per second. Bladeburner is
disabled in BN8, meaning that you must rely on your gang to purchase
Augmentations and/or join various factions to get their exclusive Augmentations.
The BitNode grants you the following:

-   You are given $250m. When you install Augmentations or perform a soft reset,
    your money would reset to $250m.
-   Membership at the World Stock Exchange (WSE) and access to the TIX API. You
    must purchase access to Four Sigma data and API.
-   The ability to short stocks and place limit/stop orders.
-   Upon joining any faction, you are immediately able to donate money to the
    faction in return for faction reputation.

Destroying each level of this BitNode would reward you with the following:

-   Level 1. Permanent membership at the WSE and access to the TIX API. Your
    hacking growth multipliers will be increased by 12%.
-   Level 2. Permanently able to short stocks in other BitNodes. Your hacking
    growth multipliers will be increased by 18%.
-   Level 3. Permanently able to place limit/stop orders in other BitNodes. Your
    hacking growth multipliers will be increased by 21%.

## Difficulty

This BitNode is considered very hard. The primary source of difficulty is
figuring out how to generate money on the stock market without access to Four
Sigma data and API. Even if you figure out a way to forecast the prices of
stocks, it can take a long time to generate enough money to buy access to the
relevant data and API. Once you have enough money to purchase Four Sigma data
and API, you can use the trade bot you have been using in other BitNodes. You
should beat BN8.1 without using Four Sigma data and API to unlock the
achievement `BN8: Challenge`.

## Pre-4S

Prior to obtaining Four Sigma data and API, your script for trading on the stock
market is essentially the same as the trade bot you have been using in other
BitNodes. The differences are two-fold:

1. You must implement a technique to forecast stocks. Until you have access to
   Four Sigma Market Data TIX API, you cannot use the function
   [`ns.stock.getForecast()`](https://github.com/bitburner-official/bitburner-src/blob/stable/markdown/bitburner.tix.getforecast.md).
1. You can now take advantage of shorting stocks to generate even more money.
   You can also implement some logic for placing limit and stop orders.

### Forecast

Without access to Four Sigma data and API, you must implement some way to
forecast prices of stocks. Here is a technique to forecast stock prices. Prior
to trading on the stock market, gather some data on the prices of each stock. In
each tick, record the price of each stock. Let $p$ be the price array of a
stock, where $p_i$ is the price on the $i$-th tick prior to now. Then $p_0$ is
the price of the current tick, $p_1$ is the price of the previous tick, $p_2$ is
the price of two ticks prior, and so on. Code the price $p_i$ depending on
whether it is increasing or decreasing in comparison to $p_{i+1}$. If the price
$p_i$ is an increase in comparison to $p_{i+1}$, then code the price $p_i$ as 1,
otherwise code it as 0. One way to detect an increase or decrease is to
calculate the ratio $r_i = p_i / p_{i+1}$. If $r_i > 1$, then we have an
increase and code the price as $c_i = 1$, otherwise we have a decrease (or
stagnant price) and code it as $c_i = 0$. To forecast the price of a stock, sum
the coded values and divide the sum by the number of coded values. The result is
a ratio of how many price increases you observed in the limited price history
you collected for a particular stock. Use that ratio in the same way as you
would use the forecast value from the function
[`ns.stock.getForecast()`](https://github.com/bitburner-official/bitburner-src/blob/stable/markdown/bitburner.tix.getforecast.md).

How large should be the price array? You want at least 14 coded prices, hence at
least 15 prices in 15 consecutive ticks. Before you buy or sell shares of any
stock, you must collect prices of each stock in 15 (or more) consecutive ticks.
When you have 14 (or more) coded prices, you can begin to generate forecast
values. You only ever want a limited number of coded prices. Adding the latest
coded price consequently means you must remove the oldest coded price.

### Shorting stocks

Shorting a stock can be viewed as the opposite of buying shares of a stock in
the Long position. The Long position of a stock depends on the stock increasing
in value. While the price of the stock is increasing, you leave it to increase.
If a stock is forecast to decrease in value in the next tick, and you can make a
profit by selling all shares of the stock in the Long position, then you should
sell all shares you own of the stock in the Long position. A Short position
works in the opposite direction because you are betting on the price of a stock
decreasing in the next tick. As long as the price of the stock is decreasing,
you leave it to decrease. If a stock is forecast to increase in the next tick,
and you can make a profit by selling all shares of the stock in the Short
position, then you should sell all shares you own of the stock in the Short
position.

[[TOC](README.md "Table of Contents")]
[[Previous](gang.md "BitNode-2: Rise of the Underworld")]

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
