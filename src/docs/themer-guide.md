**Note:** Reading the [Documentation](https://github.com/Aliucord/documentation/blob/main/theme-dev) and using the [Theme maker site](https://aliucord.com/theme-maker) can help you make your own theme.

## How to set a custom background

First of all, you need to enable transparency in Themer settings (chat, chat & settings). If you want full transparency, you need to use the template found below.

**GitHub:**
  - Create a GitHub account
  - Create a repo (make sure it's public)
  - Click Add file and upload the image/gif
  - Once uploaded, click its name
  - Hold the image and copy the address
  - Go to Themer settings → your theme → Background & paste it

**Locally:**
  - Install [this file manager](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) & open it (or any file manager that lets you copy file paths)
  - Find the image/gif file
  - Click the 3 dots next to it & press Copy path
  - Go to Themer settings → your theme → Background & paste it
  - Add file:/ at the start

Final result should be file://storage/emulated/0/Example/Example.jpg

GitLab, Imgbb & Imgur also work.

## How to set a custom font

First of all, you need to enable the Enable Custom Fonts option in Themer settings.

**GitHub:**
  - Create a GitHub account
  - Create a repo (make sure it's public)
  - Click Add file and upload the font
  - Once uploaded, click its name
  - Hold View raw and copy the address
  - Go to Themer settings → your theme → Fonts & paste it where the asterisk is
    If the font you want is already uploaded in some repo, you can just copy the raw link, no need to make your own repo.

**Locally:**
  - Install [this file manager](https://play.google.com/store/apps/details?id=me.zhanghai.android.files) & open it (or any file manager that lets you copy file paths)
  - Find the font file
  - Click the 3 dots next to it & press Copy path
  - Go to Themer settings → your theme → Fonts & paste it where the asterisk is
  - Add file:/ at the start

Final result should be file://storage/emulated/0/Example/Example.ttf

## Why does my background image not work

- You didn't enable transparency
- You enabled full transparency which doesn't work without the template
- You are using cdn.discordapp.com or media.discordapp.net which don't work as a valid URL anymore
- The URL is incorrect

## How to make the background work with full transparency

- Open the [template](https://github.com/OasisVee/theme-templates/blob/main/full-transparency-background-template.json)
- Press the 3 dots and download
- Move the downloaded .json to your Aliucord/themes folder using a file manager & restart Aliucord if it was open
- Go to Themer settings, enable full transparency & enable the theme
- Go inside the theme settings → Background & paste the image/gif url
- Press back, press the save button & restart Aliucord