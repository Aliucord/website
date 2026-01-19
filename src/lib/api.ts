export async function fetchPlugins() {
  try {
    const response = await fetch("https://plugins.aliucord.com/manifest.json");
    if (!response.ok) throw new Error("Failed to fetch plugins");
    return await response.json();
  } catch (error) {
    console.error("Error fetching plugins:", error);
    return [];
  }
}

export async function fetchThemes() {
  try {
    const response = await fetch("https://rautobot.github.io/themes-repo/data.json");
    if (!response.ok) throw new Error("Failed to fetch themes");
    return await response.json();
  } catch (error) {
    console.error("Error fetching themes:", error);
    return [];
  }
}
