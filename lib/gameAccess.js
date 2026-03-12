export const GAME_ACCESS_LINKS = {
  "spark-samar": process.env.SPARK_ACCESS_SAMAR_URL || "https://samarnew2.netlify.app/",
  "spark-family-talks": process.env.SPARK_ACCESS_FAMILY_URL || "https://swalefbitna.netlify.app/",
  "spark-imagine-if": process.env.SPARK_ACCESS_IMAGINE_URL || "https://khayalk.netlify.app/",
};

export function resolveAccessLinks(cartItems = []) {
  const unique = new Map();
  for (const item of cartItems) {
    const url = GAME_ACCESS_LINKS[item.id];
    if (!url) continue;
    if (!unique.has(item.id)) {
      unique.set(item.id, { id: item.id, title: item.name, url });
    }
  }
  return Array.from(unique.values());
}
