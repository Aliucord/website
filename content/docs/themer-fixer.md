+++
date = '2026-09-03T18:05:38-05:00'
draft = false
title = 'Themer Fixer'
weight = 13
+++

If you are on an AOSP-based ROM / Custom ROM and you have issues with Themer not theming some components properly, and you have root access, you can try this method. It works for full transparency and no transparency.

## Requirements

- [LSPosed/Vector](https://github.com/JingMatrix/Vector/releases)
    - Vector needs a Zygisk implementation to work
- [Discord Themer](https://github.com/Aliucord/DiscordThemer/releases)
- Aliucord Themer plugin

## Steps

1. Install the Themer plugin in Aliucord and install and enable a theme.
2. Install Discord Themer. You need LSPosed for it to work, so install it too.
3. Enter LSPosed and enable Discord Themer in Modules.
4. Select Aliucord.
5. [Download this file](https://github.com/WhenFreedom/Themes/releases/download/v1.0.1/ThemerFixer.json) 
6. Go to Discord Themer and enable Advanced Settings, then press Load Settings and select the json file you downloaded.
7. Restart Aliucord

## It doesn't work!

In case it didnt work you may want to try to do the following:

1. Enter Discord Themer and enable Force Disable Module.
2. Tap on Colors. 
3. Search for "primary" in the search bar
4. Scroll until you see strings with "(i)" next to them.
5. Make each of these strings transparent by clicking on the color and sliding the transparency bar.
6. Make sure these listed strings are transparent:
    - `primary`
        - `primary_500`
        - `primary_600`
        - `primary_630`
        - `primary_660`
        - `primary_700`
        - `primary_800`
    - `primary_dark`
        - `primary_dark_600`
        - `primary_dark_630`
        - `primary_dark_660`
        - `primary_dark_700`
        - `primary_dark_800`
    - `brand`
        - `brand_500`
    - `brand_new`
        - `brand_new`
        - `brand_new_500`
7. Go back and disable Force Disable Module.
8. Disable Advanced Settings and re-enable it.
9. Restart Aliucord.
