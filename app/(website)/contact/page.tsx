import NewContactUs from "@/components/website/NewContactUs";
import { getFooterServer } from "@/lib/firebase/footer";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function ContactPage() {
  const footerData = await getFooterServer();

  return (
    <div className="p-6 max-w-7xl mx-auto pt-20">
      <NewContactUs
        contactData={{
          phone: footerData?.phone,
          socialMedia: footerData?.socialMedia,
        }}
      />
    </div>
  );
}
