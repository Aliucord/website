+++
date = '2026-08-30T16:14:14-05:00'
draft = false
title = 'FAQ and Common Issues'
weight = 1
+++

## How to install Aliucord
Download the latest [Manager APK](https://github.com/Aliucord/Manager/releases/download/v1.3.0/aliucord-manager-v1.3.0.apk) and install it. Once installed, open it and grant all perms, then press "New install" and proceed with the installation.

## How to install plugins
1. Join the [Aliucord Discord server](https://discord.gg/EsNDvBaHVU)
2. Make sure you are using the Aliucord app
3. Go to `#plugins-list` or `#new-plugins` channels and hold any message
4. Click on `View [Author]'s Plugins` for `#plugins-list` or `Install [Plugin name]` for `#new-plugins`
5. Install the plugin you want

**Tips:**
- Most plugins need an app restart to work properly.
- The PluginWeb plugin is recommended if you want a built-in plugin list.
- You can use the `#bot-spam` channel to find plugins with Lumi bot. Just type `!plugins` followed by the name/keyword of the plugin you want.

## How to install themes
**If the theme you are using doesn't work for you, either you are not using the right transparency mode, you are not using theme mirror from `#theme-support` pins (this only affects image background), or Themer is broken on your end (can happen depending on Android version/OS)**

1. Join the [Aliucord Discord server](https://discord.gg/EsNDvBaHVU)
2. Make sure you are using the Aliucord app
3. Install `Themer` plugin
4. Go to `#themes` channel and hold any message (NOT THE LINK)
5. Click on the first option `Install [Theme name]`
6. Go to Themer plugin settings and enable the theme

## How to install plugins manually
Required for [#unmaintained-plugins](https://discord.com/channels/811255666990907402/861935147272110100) channel

If you already have the plugin `.zip`, just follow two last steps.

1. Go to any plugin repository ([like this one](https://github.com/Juby210/Aliucord-plugins))
2. Click the branch button and select `builds`
3. Click the `[PluginName].zip` of the plugin you want
4. Click `Raw`, `View raw` or the download button to download the `.zip` file
5. Using a file manager ([we recommend Material Files](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) ([F-Droid](https://f-droid.org/packages/me.zhanghai.android.files/))) move the downloaded `.zip` to the `Aliucord/plugins` folder
6. Restart Aliucord

## Is there a plugin for...?
- No, there is no plugin to get nitro for free. However, you can type `!fakenitro` in `#bot-spam` channel to get a list of plugins that mimic nitro features.
- No, there is no plugin for RPC (Rich Presence).
- No, there is no soundboard plugin.
- No, there is no plugin to mass/bulk delete messages/dms.
- No, a plugin for new/modern UI doesn't exist. However, you can install the "DiscordRN Dark" theme which mimics the color & font of it.
- No, there is no plugin to bypass file size.

## Can i use Aliucord with the new Discord UI? will the devs update it to a newer version?
No. Aliucord can only be used with 126.21 Discord version and the devs won't update the base version to a newer one due to several reasons (a list can be found [here](/docs/old-ui)). This doesn't mean Aliucord is abandoned, it is still actively maintained and plugins are still being created and worked on, along with backports of features from new Discord. You can use [another client](https://github.com/Discord-Client-Encyclopedia-Management/Discord3rdparties) that uses the new version if you prefer it.

## What features from new Discord have been backported? and which ones are missing?
See [this list](/docs/backports) for backported features and [this one](/docs/missing-features) for missing features.

## Is tracking & telemetry disabled / is there a no track plugin?
Yes, NoTrack is part of the CorePlugins. Crashlytics, Adjust, Discord analytics and Spotify analytics are all disabled.

## Is Aliucord safe? does it have any virus or can i get banned for using it?
Aliucord is completely safe & open source. It has been the most popular Discord client mod for many years already, and there's no case of someone being banned for using it nor getting hacked. Just don't install unofficial plugins that might abuse the API or steal your credentials (and don't share your token).

## Will I get banned for using Aliucord?
Client modifications are against Discord's Terms of Service. However, there are no known cases of users getting banned just for using Aliucord. Avoid plugins that bypass or spam Discord's API 

## Google Play Protect says Aliucord is potentially harmful
Every Android app is signed with a signature by its developer. This way Android can confirm an apk comes from a credible source and wasn't tampered with. Because Aliucord is built locally on your device, that also means it is signed locally on your device, with a signature created just for you (can be found at Aliucord/ks.keystore). This means that the signature of your Aliucord app is unique and Google doesn't recognise it. That's why it shows you a warning that this app is from an untrusted developer. Thus, you can safely ignore the warning.

## Duckduckgo anti tracker / Other anti tracker says Aliucord contains trackers even though its supposed to block them
Most of these apps simply check for the existence of tracking libraries inside the app. Aliucord still contains discords tracking libraries, removing them entirely would be virtually impossible. Instead, we simply disable them or patch them to do nothing. So while anti tracking apps still flag Aliucord, tracking is disabled as much as possible.
The only tracking that is still enabled is essential for basic functionality, for instance Google firebase is required for notifications to work as that is how discord sends them to your phone.

## Why is Aliucord starting so slowly?
First reason is most likely MessageLogger plugin, this plugin has a database which can make your app slower if it gets big. To clear it go to the plugin settings and click both clear edited messages and deleted messages. If this didn't solve it or you don't even have the plugin installed, try clearing cache, app data or reinstalling Aliucord through the manager.

## I got the new experimental status notifications for when friends change their status, how do i turn it off?
Go into the notification settings for Aliucord (Settings app, not inside Aliucord) and go into notification categories. There you should find a setting called "other". Turn it off. If you don't see notification categories, go into advanced settings first and turn on "Manage notification categories for each app".

## I can't login because of 2FA
If you have logging issues due to 2FA you most likely have security keys added. You will need to remove them from an official Discord client. After that, you will be able to log in normally. Note that backup codes do not work either.

## Manager is failing on downloading step
Use a VPN (if you don't have one, ProtonVPN is free) or use another network. Some ISPs, such as all the ones in Turkey, block either our backend and/or GitHub.

## Manager is failing or is stuck on installing step
Your OS doesn't properly show install prompts. Cancel the install, enable "Keep Patched APKs" in settings, try to re-install, and once you get stuck again, then go back to settings to export the apk. You can then manually install the APK yourself.
