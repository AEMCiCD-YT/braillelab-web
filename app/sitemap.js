import { absoluteUrl } from "../content/metadata";

export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/reto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/participar", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cronograma", priority: 0.9, changeFrequency: "weekly" },
  { path: "/recursos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/braillelab", priority: 0.8, changeFrequency: "monthly" },
  { path: "/alianzas", priority: 0.9, changeFrequency: "weekly", lastModified: "2026-10-08T00:00:00-05:00" },
  { path: "/transparencia", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-10-08T00:00:00-05:00" },
  { path: "/privacidad", priority: 0.4, changeFrequency: "yearly", lastModified: "2026-10-08T00:00:00-05:00" },
];

export default function sitemap() {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(route.lastModified ?? "2026-09-26T00:00:00-05:00"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
