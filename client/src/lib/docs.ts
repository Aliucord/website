export interface DocSection {
  title: string;
  content: string;
}

export const PLUGIN_DOCS: DocSection[] = [
  {
    title: "Prerequisites",
    content: `- PC
- Knowledge of Java/Kotlin, Android, adb and git
- [Android Studio](https://developer.android.com/studio) - While you can technically make plugins with any IDE, Android Studio is by far the easiest and most convenient as it manages many things for you
- [Java SDK](https://jdk.java.net/16/) - Comes with Android Studio
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) - Comes with Android Studio
- [Git](https://git-scm.com/downloads)
- [Jadx](https://github.com/Juby210/jadx) - This is used to decompile the Discord apks to human readable java files`
  },
  {
    title: "Introduction",
    content: `## Basic Plugin Structure

Every plugin must extend the plugin class and be [annotated](https://docs.oracle.com/javase/tutorial/java/annotations/)
with the @AliucordPlugin annotation

Plugins have a few life cycle methods:
- \`load(Context)\`: called whenever your plugin is loaded. Do initialisation here
- \`unload(Context)\`: called whenever your plugin is unloaded
- \`start(Context)\`: called whenever your plugin is started. Register commands or patches here
- \`stop(Context)\`: called whenever your plugin is stopped. Unregister commands or patches here

Thus, they are called in the order \`load -> start -> stop -> unload\`. If load or start throws an exception, it will be logged to the debug log
and your plugin will be unloaded.

Additionally, every plugin class has access to a CommandsAPI to register commands, a PatcherAPI to add patches
and a SettingsAPI to persist data. You may also register a custom SettingsTab

A minimal plugin boilerplate looks like this:

<details>
<summary>Java</summary>
<br>

\`\`\`java
package com.yourname.plugins;

import android.content.Context;

import com.aliucord.annotations.AliucordPlugin;
import com.aliucord.entities.Plugin;

@SuppressWarnings("unused")
@AliucordPlugin
public class MyPlugin extends Plugin {
    @Override
    public void start(Context context) {

    }

    @Override
    public void stop(Context context) {

    }
}
\`\`\`
</details>

<details>
<summary>Kotlin</summary>
<br>

\`\`\`kt
package com.yourname.plugins

import android.content.Context

import com.aliucord.annotations.AliucordPlugin
import com.aliucord.entities.Plugin

@SuppressWarnings("unused")
@AliucordPlugin
class MyPlugin : Plugin() {
    override fun start(context: Context) {

    }

    override fun stop(context: Context) {

    }
}
\`\`\`
</details>

## Plugin Template

A [Plugin Template](https://github.com/Aliucord/plugins-template) is available that has everything set up for you`
  },
  {
    title: "Commands",
    content: `Aliucord offers a rich commands api which makes it easy to implement your own commands. It hooks into slash commands so all commands will be
made available along with the regular slash commands.

## The basics

Every plugin has its own CommandsAPI
made available as \`commands\` inside your plugin class.

You can register commands using \`commands.registerCommand(name, description, options, callback)\` and unregister
them later either by using \`commands.unregisterCommand(commandName)\` or via \`commands.unregisterAll()\`.
Commands should be unique, so please use a meaningful command name that won't overlap with other plugins.

Commands are run on a separate thread, so you can do heavy work here, send Http Requests, etc...

Errors are caught and will be presented to the user in a nicely formatted error, but you should still make sure your command never throws errors.

The callback is a lambda function that gets the CommandContext as only argument and should return a
CommandResult or null to send no reply.

## CommandOptions

Command Options are options the user can specify. They can be used to make the user input any text, select from a selection of values, select another user, etc.

Quick rundown:
\`\`\`kt
Utils.createCommandOption(
        type: ApplicationCommandType = ApplicationCommandType.STRING,
        name: String,
        description: String? = null,
        descriptionRes: Int? = null,
        required: Boolean = false,
        default: Boolean = false,
        channelTypes: List<Int?> = emptyList(),
        choices: List<CommandChoice> = emptyList(),
        subCommandOptions: List<ApplicationCommandOption> = emptyList(),
        autocomplete: Boolean = false
): ApplicationCommandOption
\`\`\``
  },
  {
    title: "Patching",
    content: `Aliucord currently uses the [Pine](https://github.com/canyie/pine) java method hook framework for hooking Discord's methods, though in plugins you should always use the XposedBridge wrapper to prepare for future internal code changes.

You can use it to run your own code before, instead of or after any method of any Discord class

## Finding the right method to patch

Refer to the Finding Discord Stuff guide.

## Retrieving private fields / calling private methods inside patches

Refer to the Reflection guide.

## The Basics

Every plugin has its own Patcher instance as \`patcher\` inside your Plugin class

You can add patches using \`patcher.patch(method, methodHook)\`. This will return a Runnable
that when invoked will remove the patch again. Alternatively, you can simply use \`patcher.unpatchAll()\` to remove all patches.

The \`patch\` method essentially takes two arguments. A fully qualified method and a XC_MethodHook.

Assuming you want to patch the \`applyMagic\` method of the Magician class:
\`\`\`java
package com.discord.magic;

public class Magician {
    public void applyMagic(Context context, String kind, int count) {
        // Some magical code
    }
}
\`\`\`

There are two ways to do so:

### Specifying the className, methodName and arguments

<details>
<summary>Java</summary>
<br>

\`\`\`java
patcher.patch("com.discord.magic.Magician", "applyMagic", new Class<?>[] { Context.class, String.class, int.class }, myMethodHook);
\`\`\`
</details>

<details>
<summary>Kotlin</summary>
<br>

\`\`\`kt
patcher.patch("com.discord.magic.Magician", "applyMagic", arrayOf(Context::class.java, String::class.java, Int::class.javaPrimitiveType), myMethodHook)
\`\`\`
</details>

### Retrieving the Method yourself

<details>
<summary>Java</summary>
<br>

\`\`\`java
patcher.patch(Magician.class.getDeclaredMethod("applyMagic", Context.class, String.class, int.class), myMethodHook);
\`\`\`
</details>

<details>
<summary>Kotlin</summary>
<br>

\`\`\`kt
patcher.patch(Magician::class.java.getDeclaredMethod("applyMagic", Context::class.java, String::class.java, Int::class.javaPrimitiveType), myMethodHook)
// or for convenience one of before, instead or after like so:
patcher.before<Magician>("applyMagic", ...) {
    someMagicianMethod()
}
\`\`\`
</details>

## MethodHooks and MethodHookParams

The XC_MethodHook class describes how the method should be patched.
Possible methods are \`beforeCall\` and \`afterCall\`. To replace the method you can either use \`beforeCall\` and set the result or use XC_MethodReplacement

For convenience, Aliucord provides the Hook, PreHook and InsteadHook
classes that take a single lambda method as their only argument. These should always be used whenever possible.

## Examples

### Everyone is now called Clyde - InsteadHook

<details>
<summary>Java</summary>
<br>

\`\`\`java
import com.aliucord.patcher.InsteadHook;
import com.discord.models.user.CoreUser;

patcher.patch(CoreUser.class.getDeclaredMethod("getUsername"), InsteadHook.returnConstant("Clyde"));
\`\`\`
</details>

<details>
<summary>Kotlin</summary>
<br>

\`\`\`kt
import com.aliucord.patcher.InsteadHook
import com.discord.models.user.CoreUser

patcher.instead<CoreUser>("getUsername") { "Clyde" }
\`\`\`
</details>

### Rename all users named Clyde to Evil Clyde

<details>
<summary>Java</summary>
<br>

\`\`\`java
import com.aliucord.patcher.Hook;
import com.discord.models.user.CoreUser;

patcher.patch(CoreUser.class.getDeclaredMethod("getUsername"), new Hook(methodHookParam -> {
    var name = (String) methodHookParam.getResult();
    if (name != null && name.equalsIgnoreCase("Clyde")) methodHookParam.setResult("Evil Clyde");
}));
\`\`\`
</details>

<details>
<summary>Kotlin</summary>
<br>

\`\`\`kt
import com.aliucord.patcher.Hook
import com.discord.models.user.CoreUser

patcher.after<CoreUser>("getUsername") {
    val name = it.result as String?
    if (name != null && name.equalsIgnoreCase("Clyde")) it.result = "Evil Clyde";
}
\`\`\`
</details>`
  },
  {
    title: "Settings",
    content: `Every plugin has access to a SettingsAPI instance,
made available as \`this.settings\` inside your plugin class,
which can be used to persist settings. You can store any data structure here: Strings, Integers, Booleans or even Objects (json stringified).

Setting keys are automatically prefixed with your plugin name to prevent collisions.

Settings are stored per-plugin inside \`/Aliucord/settings/[PluginName].json\`.

If this is undesired, you may manually write to the Aliucord Path or whichever you deem appropriate. Avoid storing huge data structures or raw bytes here.

## SettingsTab

You may want to add a SettingsTab to your plugin, which can be opened by clicking the settings button on your plugin's card in
Aliucord's plugins tab

To do so, you must simply set \`this.settingsTab\` to a SettingsTab.
This can either be a dedicated page or a bottomsheet

## Passing arguments to your SettingsTab

It may be desired to pass arguments to your SettingsTab, e.g. your plugin's SettingsAPI.
To do so, simply make use of SettingsTab.withArgs:

<details>
<summary>Java</summary>
<br>

\`\`\`java
public class MyPlugin extends Plugin {
    public MyPlugin() {
        settingsTab = new SettingsTab(MySettingsPage.class).withArgs(settings);
    }
}
\`\`\`
</details>

<details>
<summary>Kotlin</summary>
<br>

\`\`\`kt
class MyPlugin : Plugin() {
    init {
        settingsTab = SettingsTab(MySettingsPage::class.java).withArgs(settings)
    }
}
\`\`\`
</details>

Then inside your SettingsPage fragment:

<details>
<summary>Java</summary>
<br>

\`\`\`java
public class MySettingsPage extends SettingsPage {
    private final SettingsAPI mSettings;

    public MySettingsPage(SettingsAPI settings) {
        mSettings = settings;
    }
}
\`\`\`
</details>

<details>
<summary>Kotlin</summary>
<br>

\`\`\`kt
class MySettingsPage(val mSettings: SettingsAPI) : SettingsPage() {

}
\`\`\`
</details>

## Dedicated Settings Page

This is a dedicated page that takes up the entire screen.

To use it, you must extend com.aliucord.fragments.SettingsPage
and override \`onViewBound(View)\`.

## Settings Bottomsheet

This is a sheet that takes up the bottom portion of the screen.

To use it, you must extend com.aliucord.widgets.BottomSheet
and override \`onViewCreated(view: View, bundle: Bundle)\`.`
  },
  {
    title: "Reflection",
    content: `This part of the guide should be used when a field or method you want to use/access is not public. There are two ways to get around non-public fields/methods.

## Access methods

Sometimes, the method or field will have a static "access method" that allows you to access the private method or field from outside of the class. They are usually named something along the lines of \`access$_______\`, with the blank being the field or method name. They take in an instance of the class as the first argument, and any other method arguments should you be "accessing" a method.

<details>
  <summary>Field example</summary>
  <br>

  \`\`\`java
  public static final int access$getToolbarHeight$p(WidgetMedia widgetMedia) {
    return widgetMedia.toolbarHeight;
  }
  \`\`\`
  This example method allows you to get the toolbarHeight field of WidgetMedia. It takes in a \`WidgetMedia\` instance and returns the toolbarHight.
</details>

<details>
  <summary>Method example</summary>
  <br>

  \`\`\`java
  public static final void access$handlePlayerEvent(WidgetMedia widgetMedia, AppMediaPlayer.Event event) {
      widgetMedia.handlePlayerEvent(event);
  }
  \`\`\`
  This example allows you to call the handlePlayerEvent of \`WidgetMedia\`, which is normally private.

</details>

To use these, simply call the method. If you are using kotlin, you have to wrap the function name in backticks:
\`\`\`kt
WidgetMedia.\`access$handlePlayerEvent\`(widgetMedia, event)
\`\`\`

## Reflection

If the above is not possible, you can use reflection to access non-public methods/fields.

<details>
  <summary>Java (method)</summary>
  <br>

  \`\`\`java
  var method = ClassName.class.getDeclaredMethod("methodName");
  method.setAccessible(true);
  var result = method.invoke(classInstance);
  \`\`\`
</details>

<details>
  <summary>Java (field)</summary>
  <br>

  \`\`\`java
  var field = ClassName.class.getDeclaredField("fieldName");
  field.setAccessible(true);
  var value = field.get(classInstance);
  \`\`\`
</details>

<details>
  <summary>Kotlin (method)</summary>
  <br>

  \`\`\`kt
  val method = ClassName::class.java.getDeclaredMethod("methodName").apply {
    isAccessible = true
  }
  val result = method.invoke(classInstance)
  \`\`\`
</details>

<details>
  <summary>Kotlin (field)</summary>
  <br>

  \`\`\`kt
  val field = ClassName::class.java.getDeclaredField("fieldName").apply {
    isAccessible = true
  }
  val value = field.get(classInstance)
  \`\`\`
</details>`
  },
  {
    title: "Finding Discord Stuff",
    content: `To find the Discord classes and methods you need to patch, you'll need to:

1. Use [Jadx](https://github.com/Juby210/jadx) to decompile the Discord APK to human readable Java code
2. Search through the decompiled code to find the classes and methods you need
3. Note the fully qualified class names and method signatures for use in your patches

For more detailed guidance, check the main Aliucord documentation repository.`
  }
];

export const THEME_DOCS: DocSection[] = [
  {
    title: "Introduction",
    content: `Welcome to the Documentation for the [Themer Plugin](https://github.com/Vendicated/AliucordPlugins/tree/main/Themer)

> Some things may apply to the [XPosed Module](https://github.com/Aliucord/DiscordThemer) too

## Small Introduction

**DIRECTLY MODIFY THE JSON FILE AT YOUR OWN RISK**

### Creating a Simple Theme

- Start by making a new Theme inside of the Themer plugin settings, give it a name and it will set Version, and Author (you) automatically for you.
- You will see multiple categories, choose the simple colors category and click on the + icon to add a new string. Add a \`background\` string and give it some color by clicking on it.
- Save, then select restart to see how it looks!`
  },
  {
    title: "Main Strings",
    content: `> Strings used for the plugin to tell the user what the name of the Theme is, Author, Version, License, etc but also things like custom font and custom background

## Manifest Strings

Used to show name of the theme, author, etc. They are in the "manifest" section of the .json

\`\`\`json
{
  "name": "the theme name",
  "author": "authors name",
  "license": "license, ask if you want to add one but dont know how to or what license to choose in #theme-development",
  "version": "this is the verion number, do not use text for updater",
  "updater": "this is where you put your raw.githubusercontent.com link, if you ever want to update your theme just bump the version number up"
}
\`\`\`

## Background Image Strings

These are the strings for adding a background and also giving it transparency (alpha). They are in the "background" section of the .json

**Warning: Your Background won't be visible unless you enable transparency!**

\`\`\`json
{
  "url": "url for the bg image",
  "overlay_alpha": "background transparency, goes from 0 to 255, 0 being fully transparent while 255 being fully opaque",
  "blur_radius": "background blur, goes from 0 to 25, 0 being no blur and 25 a lot of blur. yep I cant tell you better"
}
\`\`\`

## Font Strings

The string for the font URL. The string is in the "fonts" section of the .json.

\`\`\`json
{
  "*": "This changes the font globally",
  "ginto_bold": "changes categories, channel names, and headers in user settings",
  "ginto_medium": "changes user settings category names, and the channel name in the member list",
  "ginto_regular": "changes nothing for me, you can test it if you want",
  "roboto_medium_numbers": "changes nothing for me, you can test it if you want",
  "sourcecodepro_semibold": "changes nothing for me, you can test it if you want",
  "whitney_bold": "changes server template names, and Invite should look like this",
  "whitney_medium": "changes message text, channel names, button names, etc",
  "whitney_semibold": "changes selected channel name, DM List names, etc"
}
\`\`\`

## Allowed URLs

Only the links listed below are accepted for external resources. Other links will refuse to load.
This is for security and privacy reasons.

Note: Due to discord having their cdn require authentication, **using \`cdn.discordapp.com\` and \`media.discordapp.net\` links will no longer work.**

- github.com
- raw.githubusercontent.com
- gitlab.com
- i.imgur.com
- i.ibb.co`
  },
  {
    title: "Simple Strings",
    content: `These are provided by the plugin (or Xposed module). They theme many things at once for convenience.

> **Normal strings will take priority over simple strings!**

| String | Purpose |
| --------- | :----------------------- |
| background | Main backgrounds |
| background_secondary | Secondary backgrounds |
| mention_highlight | Mention highlight on message pings/replies |
| active_channel | Selected channel |
| statusbar | Status bar (where notifications, bluetooth, battery, etc... icons are located) |
| input_background | Background of input boxes (Discord login, search box, etc...) |
| blocked_bg | Background of blocked messages |`
  },
  {
    title: "Accent Strings",
    content: `> **Accent strings are used mostly for brand colors.**

| String | Purpose |
| --- | :-: |
| brand_new up to 900 | New brand Colors |
| brand_new | Accent color |
| brand_500_alpha_20 | Channel / User mention background |
| brand_new_260 | Channel / User mention text |
| brand_new_360 | Cursor color, nitro text color in the settings, turned on switch, etc... |
| brand_new_500 | Bot Tag |
| brand_new_560 | Reaction clicked border |
| link | Link colors |
| link_500 | File upload link color |`
  },
  {
    title: "Primary Strings",
    content: `> **Primary dark strings are used for main elements of discord, such as buttons, text and backgrounds.**

| String | Purpose |
| --- | :-: |
| primary_dark_100 | Chat scrollbar |
| primary_dark_200 | Chat text color |
| primary_dark_300 | Attachments and emotes icon, DMs button, Discord navigation button colors, top bar icons, Search & Settings icon in the member list, Text underneath icons in the member list, role names in Members list, server name color in the emotes list, and icons for default emotes. |
| primary_dark_330 | Timestamps, New day divider, "Message #..." color, UserDetails text, User status (friends list, DMs list) "All Servers" text in Recent Mentions, Text input placeholder (DMs, Themer) |
| primary_dark_360 | Channel list text & Categories, "Counters" text |
| primary_dark_400 | User statuses, TextInput placeholders (chat, searchbars), Server / Category name in search tab |
| primary_dark_600 | Chat background & Members List background |
| primary_dark_630 | Channel list background, Channel header background, Member list header background, Discord emoji keyboard background, User profile background, "is typing..." background, Create server background |
| primary_dark_660 | Chatbox, Gifts & Attachment icon backgrounds |
| primary_dark_700 | Server list |
| primary_dark_800 | The bottom bar that houses friends, search, mentions, and profile picture icons |

## General Strings

> **General Strings are used mostly used for smaller things, such as toasts and other text colors.**

| String | Purpose |
| --- | :-: |
| black_alpha_10 | Image color border |
| primary_300 | Unrevealed spoiler text background, default role color in the "Roles" menu |
| primary_600 | Server folders |
| primary_630 | Code block & Monospaced text background color |
| primary_660 | Code block border line color |
| primary_700 | Status (Notifications) bar, Embed background, Top Bar, DMs button, Server streaming icons, Themer bottom bar background, Server name text shadow |
| white_500 | Unread channels, Server title, Active channel text, Channel name text, Default username color, white icons in various buttons, text in toast messages |
| white_800 | Pop-up (toasts) message background |
| transparent | Inactive button backgrounds, when there is no internet status bar color |`
  },
  {
    title: "UIKit Strings",
    content: `> **UIKit strings are used for brand colors that aren't blurple, along with text and buttons.**

| String | Purpose |
| --- | :-: |
| uikit_btn_bg_color_selector_brand | Settings button color in plugins list and other areas |
| uikit_btn_bg_color_selector_green | Online icon color, add servers button in the server list, in "Invite Members" page invite button outline and text color, add friend text colour, live events button background |
| uikit_btn_bg_color_selector_red | Ping color, Uninstall button on the plugins page, and the "NEW MESSAGES" text in chat |
| uikit_settings_item_text_color_dark | Secondary text color |
| uikit_settings_item_text_color_light | Changes the color of the 'Invite Members' button, background of streaming icon, background of events icon, text placeholder blobs when the members list is loading, some buttons in context menus, and tabs |`
  },
  {
    title: "Drawable Strings",
    content: `> **Drawable strings are icons / images you see throughout discord.**

| String | Purpose |
| --- | :-: |
| drawable_button_grey | "New Unreads" button |
| drawable_open_folder_dark | Open folder |
| drawable_overlay_channels_selected_dark | Selected channel color in channel list for dark mode |
| drawable_overlay_channels_pressed_dark | Pressed channel color in channel list for dark mode |
| item_background_material | Mostly used for the top bar |
| design_bottom_navigation_item_background | Is mainly for the bottom part of the plugin page |
| drawable_button_red | The red NEW↑ in the guild list when you get a ping in a guild |`
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
:::details Notice from the AliucordRN repository
We decided to keep all development on the good old 126.21 version of Discord, which is the last version of Discord that doesn't use React Native framework. It may lack of new features that Discord added in the past year, but we should be able to keep existing functionality and to add some new features. [...] Most of our developers just disliked working and using Discord React Native (its performance is really poor and is full of bugs, there are many reasons to just not like it). If you still want to use new Discord with mods, the best choice is Vendetta (made by different team, unaffiliated).
Source: [GitHub](https://github.com/Aliucord/AliucordRN#-notice-)
:::
4. If Aliucord ceases to exist, there wouldn't be any active clients using the good old Discord version.
:::warning Bluecord
Bluecord is also a modded client for the old version of Discord, but the main developer is not a good person, so we don't recommend using it.
Source: [Google Drive](https://drive.google.com/drive/mobile/folders/1Y2m2lMSpN3GlOcXyceaO88Ljnr8xuNcp)
:::
5. Features from new Discord versions can be backported to the old one.
:::tip What does backporting mean?
Backporting is the process of porting a software update that was developed for a relatively current version of a software entity, to an older version of the software.
Source: [Wikipedia](https://en.wikipedia.org/wiki/Backporting)
:::
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

:::tip
GitLab, Imgbb & Imgur also work.
:::

## How to set a custom font

First of all, you need to enable the \`Enable Custom Fonts\` option in Themer settings.

- GitHub:
  - Create a GitHub account
  - Create a repo (make sure it's public)
  - Click \`Add file\` and upload the font
  - Once uploaded, click its name
  - Hold \`View raw\` and copy the address
  - Go to Themer settings → your theme → \`Fonts\` & paste it where the asterisk is
    :::tip
    If the font you want is already uploaded in some repo, you can just copy the raw link, no need to make your own repo.
    :::
- Locally:
  - Install [this file manager](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) & open it (or any file manager that lets you copy file paths)
  - Find the font file
  - Click the 3 dots next to it & press \`Copy path\`
  - Go to Themer settings → your theme → \`Fonts\` & paste it where the asterisk is
  - Add \`file:/\` at the start

Final result should be \`file://storage/emulated/0/Example/Example.ttf\`

:::tip
GitLab also works.
:::

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
