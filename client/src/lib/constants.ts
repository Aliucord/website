import { Share2, Puzzle, Shield, Smartphone, Palette, Code2 } from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Plugins", href: "/plugins" },
  { label: "Themes", href: "/themes" },
  { label: "FAQ", href: "/faq" },
  { label: "Documentation", href: "/documentation" },
];

export const FEATURES = [
  {
    icon: Puzzle,
    title: "Plugins",
    description: "Personalize Discord with hundreds of community-made plugins.",
  },
  {
    icon: Palette,
    title: "Theming",
    description: "Total control over how your app looks. Change colors, fonts, and even add custom backgrounds to make it your own.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Aliucord has a built-in NoTrack core plugin to reduce the tracking/telemetry of discord itself to the maximum possible. Removing all tracking is not possible as it would be dangerous.",
  },
  {
    icon: Smartphone,
    title: "Android Native",
    description: "Optimized to ensure a snappy interface and better battery life on your Android device.",
  },
  {
    icon: Code2,
    title: "Open Source",
    description: "The code is available on GitHub.",
  },
  {
    icon: Share2,
    title: "Modernized",
    description: "Many of the new Discord features have been backported. A list can be found [here](/documentation?section=backports).",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Is tracking & telemetry disabled?",
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
    answer: "Aliucord is fully open source. You can audit the code yourself on GitHub. We prioritize user privacy and safety above all else."
  }
];

export const STATS = [
  { label: "Downloads", value: "1M+" },
  { label: "Plugins", value: "200+" },
  { label: "Themes", value: "500+" },
  { label: "GitHub Stars", value: "5K+" }
];
