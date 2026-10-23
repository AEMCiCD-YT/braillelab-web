import RootDocument from "../../components/RootDocument";
import { buildMetadata, SITE_URL } from "../../content/metadata";

export { viewport } from "../../components/RootDocument";

export const metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  ...buildMetadata({ path: "/", locale: "en" }),
};

export default function RootLayout({ children }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
