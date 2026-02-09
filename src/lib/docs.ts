import { markdown as pluginDev } from "@/docs/plugin-development.md";
import { markdown as themeDev } from "@/docs/theme-development.md";
import { markdown as backports } from "@/docs/backports.md";
import { markdown as beginnerGuide } from "@/docs/beginner-guide.md";
import { markdown as changelog } from "@/docs/changelog.md";
import { markdown as forks } from "@/docs/forks.md";
import { markdown as missingFeatures } from "@/docs/missing-features.md";
import { markdown as newUi } from "@/docs/new-ui.md";
import { markdown as oldUi } from "@/docs/old-ui.md";
import { markdown as sounds } from "@/docs/sounds.md";
import { markdown as themerGuide } from "@/docs/themer-guide.md";
import { markdown as userPfpBg } from "@/docs/user-pfp-bg.md";

export interface DocSection {
  title: string;
  content: string;
}

export const PLUGIN_DOCS: DocSection[] = [
  {
    title: "Plugin Development",
    content: pluginDev
  }
];

export const THEME_DOCS: DocSection[] = [
  {
    title: "Theme Development",
    content: themeDev
  }
];

export const GENERAL_DOCS: DocSection[] = [
  {
    title: "Backports",
    content: backports
  },
  {
    title: "Beginner Guide",
    content: beginnerGuide
  },
  {
    title: "Changelog",
    content: changelog
  },
  {
    title: "Forks",
    content: forks
  },
  {
    title: "Missing Features",
    content: missingFeatures
  },
  {
    title: "New UI",
    content: newUi
  },
  {
    title: "Old UI",
    content: oldUi
  },
  {
    title: "Sounds",
    content: sounds
  },
  {
    title: "Themer Guide",
    content: themerGuide
  },
  {
    title: "UserPFP/BG",
    content: userPfpBg
  }
];