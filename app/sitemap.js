import { absoluteUrl } from "../content/metadata";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/reto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/participar", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cronograma", priority: 0.9, changeFrequency: "weekly" },
  { path: "/recursos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/braillelab", priority: 0.8, changeFrequency: "monthly" },
  { path: "/alianzas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacidad", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap() {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date("2026-09-26T00:00:00-05:00"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
