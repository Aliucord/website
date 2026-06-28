This page only shows the most relevant/important changes for most Aliucord users, if you want to see more internal changes that are not that relevant for normal Aliucord users, see the [commits page](https://github.com/Aliucord/Aliucord/commits/main).

## 2.9.7 (CURRENT VERSION)
- Fix avatars not loading
- Fix crash when clicking on safe mode status

## 2.9.6
- Display avatars at correct resolution

## 2.9.5
- Enable reply button in message actions for poll result messages
- Fix some memory leak issues caused by faulty base app code
- Fix animated webp rendering in various places
- Fix absence of create thread button in guilds that have community enabled
- Fix ViewProfileImages not working with avatar decorations

## 2.9.4
- Fix crash when opening update notification and fix duplicate plugin entries

## 2.9.3
- Revert "Support autocomplete entries with the same name" due to it causing app to be slow

## 2.9.2
- Disable sticker suggestions by default
- Treat invalid local plugin versions as outdated
- Fix ghost unread indicator in guilds with forum channels
- Remove bio height limit
- Support autocomplete entries with the same name
- Fix mismatching clock data (e.g date formatters breaking, old timeouts suddenly being reapplied)

## 2.9.1
- Fix scrolling bug in dm list

## 2.9.0
- Fix CoreUpdater and PluginUpdater
- Allow muted DM's (including Group Channels) with unread mentions to appear in side bar

## 2.8.0
- Load settings properly
- Fix Aliucord dir not being created
- Fix various PluginDownloader bugs
- Allow disabling updater

## 2.7.1
- Support slowmode permission
- Fix collapsing bug
- Fix admin/owner perms to include new pins perm
- Scan for repo links only in plugin channels

## 2.7.0
- Allow installing plugins from link context menu
- Fix "Hide Muted Channels" option accidentally hiding muted threads with unread mentions from channel list
- Fix "Hide Muted Channels" option accidentally hiding channels that contain unread mentions
- Remove sideloading block warning
- Properly display decos during message send
- Display guild tags
- Implement nameplates
- Allow installing plugins from #bot-spam channel
- Fix avatar decorations alignment in DMs list

## 2.6.0
- Temporarily fix Voice Chat until March
- Implement avatar decorations
- Fix animated webp emojis not rendering
- Add safe mode to disable all plugins
- Add missing experiments
- Disable smooth keyboard animation
- Add new Discord badges
- Disallow creating polls without permission
- Remove more billing upsells

## 2.5.0
- Remove old voice workaround
- Don't remove billing if user has nitro (the "billing settings" section from settings is now also removed for non-nitro users)
- Fix links opening in aliucord's window instead of the link's app window (such as youtube)

## 2.4.0
- User decorations coming soon
- Add Google sideloading block warning
- Rich video embed fix (such as fxtwitter)
- Italicize CorePlugins for /plugins command
- Randomize donation link in settings
- Fix AutoMod messages being broken (caused by ForwardedMessages)
- Disable school hubs dialog
- Add support for avif
- Remove billing
- Support new pin features
- Fix duplicate install buttons in #plugin-development channel

## 2.3.1
- Fix various poll bugs
- Fix a crash when leaving a server with a forwarded message loaded
- Fix reply previews
- Add AlignThreads fix as a CorePlugin
