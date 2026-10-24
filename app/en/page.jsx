import HomePage, { metadataFor } from "../../components/pages/HomePage";

export const metadata = metadataFor("en");

export default function Page() {
  return <HomePage locale="en" />;
}
