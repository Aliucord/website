**Why does Aliucord use an old Discord version?**

- The new Discord app is React Native while the Discord version that Aliucord uses (126.21) is Kotlin. React Native is very slow compared to Kotlin. RN is a framework for building apps using JavaScript, which is not as performant as Kotlin code. Discord's React Native version is known to have performance issues, especially on lower-end devices, because the app has been ported from iOS over to Android.
- Everything would need to be rewritten, wasting time, considering how bad the new Discord version is.
- Aliucord developers don't like to work with the new one. [Notice from the AliucordRN repository](https://github.com/Aliucord/AliucordRN#-notice-)
- If Aliucord ceases to exist, there wouldn't be any active clients using the good old Discord version.

<p>warning:
Bluecord is also a modded client for the old version of Discord, but the main developer is not a good person, so we don't recommend using it.<br>
Source: <a href="https://drive.google.com/drive/mobile/folders/1Y2m2lMSpN3GlOcXyceaO88Ljnr8xuNcp">Google Drive</a></p>

- Features from new Discord versions can be backported to the old one. [What does backporting mean?](https://en.wikipedia.org/wiki/Backporting)
- Modded clients for the new Discord version already exist, such as [Kettu](https://www.raincord.dev/kettu) or [Shiggycord](https://shiggycord.dev).