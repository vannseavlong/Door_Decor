import { getAboutDataServer } from "@/lib/firebase/about";
import AboutClient from "./AboutClient";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function AboutPage() {
  const aboutData = await getAboutDataServer();

  return <AboutClient aboutData={aboutData} />;
}
