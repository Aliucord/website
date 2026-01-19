export interface DocSection {
  title: string;
  content: string;
}

export const PLUGIN_DOCS: DocSection[] = [
  {
    title: "Plugin Development",
    content: "The plugin development documentation has moved to GitHub. You can find it here: [Aliucord Documentation - Plugin Dev](https://github.com/Aliucord/documentation/tree/main/plugin-dev)"
  }
];

export const THEME_DOCS: DocSection[] = [
  {
    title: "Theme Development",
    content: "The theme development documentation has moved to GitHub. You can find it here: [Aliucord Documentation - Theme Dev](https://github.com/Aliucord/documentation/tree/main/theme-dev)"
  }
];

export const GENERAL_DOCS: DocSection[] = [
  {
    title: "Backports",
    content: `# What features have been backported to Aliucord?

**Legend**
- 💣: Broken or partially broken
- 🚧: Still in development or beta

**Note:** To install the plugins from here you need to click the plugin name, it will download the plugin .zip, now just move it to the \`Aliucord/plugins\` folder using a file manager & restart Aliucord in case it was open.

## Plugins

| Feature                          | Plugin Name                                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Voice messages                   | [VoiceMessages](https://github.com/mantikafasi/AliucordPlugins/raw/builds/VoiceMessages.zip)                               |
| Playing Audio files              | [AudioPlayer](https://github.com/Archimedes9500/Halkiion-rushiiMachine-aliucord-plugins/raw/builds/AudioPlayer.zip) (fork) |
| Forwarding messages              | [ForwardMessages](https://github.com/reisxd/AliucordPlugins/raw/builds/ForwardMessages.zip)                                |
| Closing DMs from bottomsheet     | [CloseDMs](https://github.com/reisxd/AliucordPlugins/raw/builds/ForwardMessages.zip)                                       |
| Bot commands                     | [SlashCommandsFix](https://github.com/LavaDesu/Awoocord/raw/builds/SlashCommandsFixBeta.zip) 🚧                            |
| Bot embeds                       | [ComponentsV2](https://github.com/LavaDesu/Awoocord/raw/builds/ComponentsV2Beta.zip) 🚧                                    |
| Quests                           | [ViewQuests](https://github.com/nyxiereal/AliucordPlugins/raw/builds/ViewQuests.zip) 🚧                                    |
| Summaries                        | [Summaries](https://github.com/MCausc78/RNSucks/raw/builds/Summaries.zip) 🚧                                               |
| Embed playing                    | [Fluff](https://github.com/yutaplug/Aliucord/raw/main/stuff/Fluff.zip)                                                     |
| Swiping to reply                 | [SwipeToReply](https://github.com/RazerTexz/My-plugins/raw/builds/SwipeToReply.zip)                                        |
| Nick command                     | [SlashNick](https://github.com/rushiiMachine/aliucord-plugins/raw/builds/SlashNick.zip)                                    |
| Changing pronouns & display name | [MoreProfile](https://github.com/Halkiion/aliucord-plugins/raw/builds/MoreProfile.zip)                                     |
| Duplicate channel                | [CloneChannels](https://github.com/DiamondMiner88/aliucord-plugins/raw/builds/CloneChannels.zip)                           |
| Discovery                        | [Discovery](https://github.com/wingio/plugins/raw/builds/Discovery.zip) 💣                                                 |
| Devices page                     | [Sessions](https://github.com/wingio/plugins/raw/builds/Sessions.zip) 💣                                                   |
| Webhooks                         | [EditWebhooks](https://github.com/c10udburst-discord/aliucord-plugins/raw/builds/EditWebhooks.zip)                         |
| Sorted searching                 | [Scout](https://github.com/LavaDesu/Awoocord/raw/builds/Scout.zip)                                                         |
| Markdown                         | [MoreHighlight](https://github.com/wingio/plugins/raw/builds/MoreHighlight.zip)                                            |
| Connection icons                 | [UnknownConnectionIcons](https://github.com/nyakowint/AliuPlugins/raw/builds/UnknownConnectionIcons.zip)                   |
| Copy message link                | [MessageLinkContext](https://github.com/wingio/plugins/raw/builds/MessageLinkContext.zip)                                  |
| Delete embed                     | [DeleteEmbeds](https://github.com/c10udburst-discord/aliucord-plugins/raw/builds/DeleteEmbeds.zip)                         |
| Favorite channels                | [FavoriteChannels](https://github.com/zt64/aliucord-plugins/raw/builds/FavoriteChannels.zip)                               |
| New emojis                       | [NewEmojis](https://github.com/Juby210/Aliucord-plugins/raw/builds/NewEmojis.zip)                                          |
| Favorite GIFs                    | [Frecents](https://github.com/zt64/aliucord-plugins/raw/builds/Frecents.zip)                                               |
| Member since                     | [UserDetails](https://github.com/Juby210/Aliucord-plugins/raw/builds/UserDetails.zip)                                      |
| DMTabsV2                         | [DMTabs](https://github.com/OmegaSunkey/awesomeplugins/raw/builds/DMTabs.zip)                                              |
| Remove attachments individually  | [AttachmentRemover](https://github.com/RazerTexz/My-plugins/raw/builds/AttachmentRemover.zip)                              |
| Silent messages                  | [SilentMessages](https://github.com/RazerTexz/My-plugins/raw/builds/SilentMessages.zip)                                    |
| Compact message links            | [MessageLinkCompact](https://github.com/LampDelivery/AliucordPlugins/raw/builds/MessageLinkCompact.zip)                    |
| Channel browser                  | [ChannelBrowser](https://github.com/LampDelivery/AliucordPlugins/raw/builds/ChannelBrowser.zip)                            |

## Built-in to Aliucord

- Viewing forwarded messages
- Upload size (new 10mb limit for non-nitro users)
- Display names
- Pomelo usernames (\`@username\` instead of \`username#1234\`)
- Polls
- Pronouns
- New profile badges (quests, developer, etc.)
- Avatar decorations
- Guild tags (soon in core, wait for a version bump)
- Nameplates (soon in core, wait for a version bump)

## Aliucord from storage

**This method is used for core features that are not merged yet, this means that they are still in an Alpha state, use at your own risk.**
**You can't use multiple .ZIPs at once, you'll need to decide which features you prefer.**
  **How to use Aliucord from storage**

- Download the \`.zip\` file from the links below
- Extract it and find \`Aliucord.zip\` inside it
- Move \`Aliucord.zip\` to your \`Aliucord\` folder
- Open Aliucord settings
- Enable [Developer Mode](https://github.com/user-attachments/assets/ee6a45bd-08a5-4bf8-af39-6d03b9d969a4) & [Aliucord from storage](https://github.com/user-attachments/assets/37f9f074-741e-46e1-8162-f753f4af8b30)
- Restart Aliucord

You can also watch the [video instructions](https://github.com/user-attachments/assets/6860f787-cae9-4560-9d29-5efa1f05af78).

**Backports that use this method**

- [Guild tags & Nameplates](https://nightly.link/Aliucord/Aliucord/workflows/build/main/build.zip)
- [Display name styles](https://nightly.link/LavaDesu/Aliucord/workflows/build/feat%2Fdecor_displaynamestyles/build.zip?status=completed)
- [Account Standing](https://nightly.link/omardotdev/aliucar/workflows/build/feat%2Faccount-standing/build.zip?status=completed)`
  },
  {
    title: "Beginner Guide",
    content: `# Aliucord guide for beginners

## How to install Aliucord

- [Aliucord Manager installation guide](https://github.com/Aliucord/Manager#installation)
- [Direct Manager APK link](https://github.com/Aliucord/Manager/releases/download/v1.1.1/aliucord-manager-v1.1.1.apk)

## How to install plugins

1. Join the [Aliucord Discord server](https://discord.gg/EsNDvBaHVU)
2. Make sure you are using the Aliucord app
3. Go to [#plugins-list](https://discord.com/channels/811255666990907402/811275162715553823) or [#new-plugins](https://discord.com/channels/811255666990907402/845784407846813696) channels and hold any message (NOT THE LINK)
4. Click on the first option ("Open Plugin Downloader")
5. Click on any of the plugins shown in the Plugin Downloader to install them

**Tips:**
- Most plugins need an app restart to work properly.
- The PluginWeb plugin is recommended if you want a built-in plugin list.

## How to install themes

1. Join the [Aliucord Discord server](https://discord.gg/EsNDvBaHVU)
2. Make sure you are using the Aliucord app
3. Install the [Themer plugin](https://raw.githubusercontent.com/Vendicated/AliucordPlugins/builds/Themer.zip) (move the .zip to \`Aliucord/plugins\` folder & restart app)
4. Go to [#themes](https://discord.com/channels/811255666990907402/824357609778708580) channel and hold any message (NOT THE LINK)
5. Click on the first option ("Install [theme name]")

**Tips:**
- After installing a theme you should go to Themer settings to enable it.
- Themes require an app restart to work properly.
- [Additional info about Themer plugin](/themer/)

## How to install plugins manually

Required for [#unmaintained-plugins](https://discord.com/channels/811255666990907402/861935147272110100) channel
If you already have the plugin .zip, just follow two last steps.

1. Go to any plugin repository ([like this one](https://github.com/Juby210/Aliucord-plugins))
2. Click the branch button and select \`builds\`
![branch selector](image.png)
3. Click the \`[PluginName].zip\` of the plugin you want
4. Click \`Raw\`, \`View raw\` or the download button to download the .zip file
5. Using a file manager ([we recommend Material Files](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) ([F-Droid](https://f-droid.org/packages/me.zhanghai.android.files/))) move the downloaded \`.zip\` to the \`Aliucord/plugins\` folder
6. Restart Aliucord`
  },
  {
    title: "Changelog",
    content: `# Changelog

## 2.?.? (unknown version number yet)
- Display guild tags
- Implement nameplates
- Allow installing plugins from #bot-spam channel
- Fix avatar decorations alignment in DMs list

## 2.6.0 (current version)
- Temporarily fix Voice Chat until March
- Implement avatar decorations
- Fix animated webp emojis not rendering
- Add safe mode (disables all plugins)
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
- User decorations coming soon (there's a coreplugin that lays the underground, they are not visible yet tho)
- Add Google sideloading block warning
- Rich video embed fix (such as fxtwitter)
- Italicize CorePlugins for /plugins command
- Randomize donation link in settings
- Fix AutoMod messages being broken (caused by ForwardedMessages)
- Disable school hubs dialog
- Add support for avif
- Remove billing
- Prevent overriding CorePlugins with external plugins in PluginDownloader
- Support new pin features
- Fix duplicate install buttons in #plugin-development channel
- Use original ref from links in PluginDownloader

## 2.3.1
- Fix various poll bugs
- Add fallback gif format sticker
- NPE when leaving guild with forwarded msg loaded (fixes a crash when leaving a server with a forwarded message loaded)
- Handle unknown new reply message types (fixes reply previews)
- Add AlignThreads fix as a CorePlugin`
  },
  {
    title: "Forks",
    content: `# Plugin forks info

The forks can be installed from [here](https://discord.com/channels/811255666990907402/847566769258233926/1402218345570504806).

- AudioPlayer fork by Halkion fixes crashes and some bugs with audio files.

- Waifuim, NekosLife forks by Serinova fix the commands being fully broken. Additionally, Serinova made a plugin called AnimeImageFetch containing NSFW since NekosLife doesnt contain NSFW anymore.

- CheckLinks fork by Serinova fixes the majority of the urls not being checked (VirusTotal changed its link structure).

- NitroSpoof fork by Kiwi makes the fake emojis look real just like on Vencord's FakeNitro plugin or Vendetta's (and their forks) Realmoji plugin. Also fixes a scrolling bug in emoji picker.

- FakeStickers fork by Archimedes (renamed to BetterFakeStickers) fixes not being able to reply with stickers.

- UITH fork by Serinova & DeafThing (renamed to CatUITH) focuses on [Catbox](https://catbox.moe) & [Litterbox](https://litterbox.catbox.moe) services and adds more options.

- Ip fork by Serinova fixes the \`/ip\` command.

- SendEmbeds fork by Serinova makes the \`/embed\` command work again by using directwebhook (original API died).`
  },
  {
    title: "Missing Features",
    content: `# Features missing from Aliucord

Compared to the RN client.

|Feature|Notes|
|-|-|
|Apps|This means games like \`/wordle\` (ny times)
|Shop|Discord decoration/orbs store
|Ignoring users|Ignoring users (blocking without removing as friends)
|Super reactions|The fancy reactions that are more annoying than normal ones
|E2EE VC|End-to-end encryption in voice chats
|Connection info|Steam games count, reddit karma count, etc.
|Onboarding|Server onboarding
|Managing join requests|Managing join requests
|Family center|Family center
|Post tagging|Adding tags to forums posts
|In-game friends|In-game friends
|Media channels|"They're a thing apparently"
|Remixing images|Remixing images
|Soundboard|Soundboard in VCs
|Security keys|Security key to login
|Gradient roles|Roles with fancy styles
|Adding friends|Adding friends from the "Add friend" page
|Message requests|Message requests

For a list of backported features, see the [Backports](https://aliucord.vercel.app/backports/) page.`
  },
  {
    title: "New UI",
    content: `# How to make Aliucord look like modern Discord

This is not really possible due to Aliucord using an old Discord version. However, there are two themes ([DiscordRN Dark](https://discord.com/channels/811255666990907402/824357609778708580/1396601756187885659) & [Discord Midnight theme](https://discord.com/channels/811255666990907402/824357609778708580/1400698799600570398)) that replicate the color & font of it (the UI itself is not possible to replicate).

Alternatively, you can search for another modified Discord client that uses the new version instead of the old one [here](https://github.com/Discord-Client-Encyclopedia-Management/Discord3rdparties) ([Kettu](https://github.com/C0C0B01/KettuManager/releases/latest/download/Manager.apk) is recommended).`
  },
  {
    title: "Old UI",
    content: `# Why does Aliucord use an old Discord version?
1. React Native is very slow compared to Kotlin. RN is a framework for building apps using JavaScript, which is not as performant as Kotlin code. Discord's React Native version is known to have performance issues, especially on lower-end devices, because the app has been ported from iOS over to Android.
2. Everything would need to be rewritten, wasting time, considering how bad the new Discord version is.
3. Aliucord developers don't like to work with the new one.
Notice from the AliucordRN repository
We decided to keep all development on the good old 126.21 version of Discord, which is the last version of Discord that doesn't use React Native framework. It may lack of new features that Discord added in the past year, but we should be able to keep existing functionality and to add some new features. [...] Most of our developers just disliked working and using Discord React Native (its performance is really poor and is full of bugs, there are many reasons to just not like it). If you still want to use new Discord with mods, the best choice is Vendetta (made by different team, unaffiliated).
Source: [GitHub](https://github.com/Aliucord/AliucordRN#-notice-)
4. If Aliucord ceases to exist, there wouldn't be any active clients using the good old Discord version.

<p>warning:
Bluecord is also a modded client for the old version of Discord, but the main developer is not a good person, so we don't recommend using it.<br>
Source: <a href="https://drive.google.com/drive/mobile/folders/1Y2m2lMSpN3GlOcXyceaO88Ljnr8xuNcp">Google Drive</a></p>

5. Features from new Discord versions can be backported to the old one.
What does backporting mean?
Backporting is the process of porting a software update that was developed for a relatively current version of a software entity, to an older version of the software.
Source: [Wikipedia](https://en.wikipedia.org/wiki/Backporting)
6. Modded clients for the new Discord version already exist, such as [Kettu](https://github.com/C0C0B01/KettuManager/releases/).`
  },
  {
    title: "Sounds",
    content: `# How to use StartupSound, NoticeSound & CustomSounds plugins

- GitHub:
  - Create a GitHub account
  - Create a repo (make sure its public)
  - Click add file and upload the sound
  - Once uploaded, click its name
  - Hold \`View raw\` and copy the address
  - Paste the link(s) into the plugin

- Locally:
  - Install [this file manager](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) & open it (or any file manager that lets you copy file paths)
  - Find the sound file
  - Click the 3 dots next to it & press \`Copy Path\`
  - Go to the plugin settings & paste it
  - Add \`file://\` at the start

Final result should be \`file:///storage/emulated/0/Example/Example.mp3\``
  },
  {
    title: "Themer Guide",
    content: `# Themer plugin guide

## How to create your own theme

- [Documentation](https://github.com/Aliucord/documentation/blob/main/theme-dev)
- [Theme maker](https://aliucord.com/theme-maker)

## How to set a custom background

First of all, you need to enable transparency in Themer settings (chat, chat & settings). If you want full transparency, you need to use the [template](#how-to-make-the-background-work-with-full-transparency).

- GitHub:

  - Create a GitHub account
  - Create a repo (make sure it's public)
  - Click \`Add file\` and upload the image/gif
  - Once uploaded, click its name
  - Hold the image and copy the address
  - Go to Themer settings → your theme → \`Background\` & paste it

- Locally:
  - Install [this file manager](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) & open it (or any file manager that lets you copy file paths)
  - Find the image/gif file
  - Click the 3 dots next to it & press \`Copy path\`
  - Go to Themer settings → your theme → \`Background\` & paste it
  - Add \`file:/\` at the start

Final result should be \`file://storage/emulated/0/Example/Example.jpg\`

GitLab, Imgbb & Imgur also work.

## How to set a custom font

First of all, you need to enable the \`Enable Custom Fonts\` option in Themer settings.

- GitHub:
  - Create a GitHub account
  - Create a repo (make sure it's public)
  - Click \`Add file\` and upload the font
  - Once uploaded, click its name
  - Hold \`View raw\` and copy the address
  - Go to Themer settings → your theme → \`Fonts\` & paste it where the asterisk is
    If the font you want is already uploaded in some repo, you can just copy the raw link, no need to make your own repo.
- Locally:
  - Install [this file manager](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) & open it (or any file manager that lets you copy file paths)
  - Find the font file
  - Click the 3 dots next to it & press \`Copy path\`
  - Go to Themer settings → your theme → \`Fonts\` & paste it where the asterisk is
  - Add \`file:/\` at the start

Final result should be \`file://storage/emulated/0/Example/Example.ttf\`

GitLab also works.

## Why does my background image not work

- You didn't enable transparency
- You enabled full transparency which doesn't work without the template
- You are using \`cdn.discordapp.com\` or \`media.discordapp.net\` which don't work as a valid URL anymore
- The URL is incorrect

## How to make the background work with full transparency

- Open the [template](https://github.com/OasisVee/theme-templates/blob/main/full-transparency-background-template.json)
- Press the 3 dots and download
- Move the downloaded \`.json\` to your \`Aliucord/themes\` folder using a file manager & restart Aliucord if it was open
- Go to Themer settings, enable full transparency & enable the theme
- Go inside the theme settings → \`Background\` & paste the image/gif url
- Press back, press the save button & restart Aliucord`
  },
  {
    title: "UserPFP/BG",
    content: `# How to use UserPFP & UserBG plugins

## UserPFP
- Make sure you have the plugin installed
- Join the [UserPFP server](https://discord.gg/userpfp-1129784704267210844)
- Read \`#avatar-rules\` before proceeding
- Go to \`#request-here\` and use the \`/request\` command
- Add the gif you want
- You will get a ping whenever it has been added or rejected
- When it's accepted go to the plugin settings and click "Redownload databases"
- Restart Aliucord to see the changes

## UserBG
- Make sure you have the plugin installed
- Join the [UserBG server](https://discord.gg/TeRQEPb)
- Read \`#usrbg-guide\` before proceeding
- Use the \`/bg\` command in any channel that you can type in
- Add the image/gif you want
- Check \`#userbg-log\` to see if it has been accepted or not
- Go to the plugin settings and click "Redownload databases"
- Restart Aliucord to see the changes`
  }
];
