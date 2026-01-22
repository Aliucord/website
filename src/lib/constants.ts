export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Plugins", href: "/plugins" },
  { label: "Themes", href: "/themes" },
  { label: "FAQ", href: "/faq" },
  { label: "Documentation", href: "/documentation" },
  { label: "About", href: "/about" },
];

export const FEATURES = [
  {
    iconName: "extension",
    title: "Plugins",
    description: "Personalize Discord with hundreds of community-made plugins.",
  },
  {
    iconName: "palette",
    title: "Theming",
    description: "Total control over how your app looks. Change colors, fonts, and even add custom backgrounds to make it your own.",
  },
  {
    iconName: "security",
    title: "Privacy First",
    description: "Aliucord has a built-in plugin called NoTrack to reduce the tracking/telemetry of Discord to the maximum possible.",
  },
  {
    iconName: "phone_android",
    title: "Android Native",
    description: "Optimized for better performance and battery life on your Android device.",
  },
  {
    iconName: "code",
    title: "Open Source",
    description: "The code is available on GitHub.",
  },
  {
    iconName: "update",
    title: "Modernized",
    description: "Many of the new Discord features have been backported. A list can be found [here](/documentation?section=backports).",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Is tracking and telemetry disabled?",
    answer: "Yes, Aliucord has a built-in NoTrack core plugin to reduce the tracking/telemetry of Discord itself to the maximum possible. Removing all tracking is not possible as some level of data is still required in order for Discord to function."
  },
  {
    question: "Will I get banned for using Aliucord?",
    answer: "Client modifications are against Discord's Terms of Service. However, there are no known cases of users getting banned just for using Aliucord. Avoid plugins that bypass API restrictions or automate behavior."
  },
  {
    question: "Where can I find plugins?",
    answer: "You can find a massive list of plugins in our Discord server's #plugins-list channel."
  },
  {
    question: "Is it safe to use?",
    answer: "Aliucord is fully open source. You can look at the code on Github."
  }
];

export const STATS = [
  { label: "Downloads", value: "1M+" },
  { label: "Plugins", value: "200+" },
  { label: "Themes", value: "500+" },
  { label: "GitHub Stars", value: "5K+" }
];
