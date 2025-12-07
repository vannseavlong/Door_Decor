import { FaFacebookF, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const contacts = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/1GAKNhff5A/?mibextid=wwXIfr",
    bg: "#4267B2",
  },
  {
    label: "TikTok",
    icon: SiTiktok,
    href: "https://www.tiktok.com/@cwww47?_r=1&_t=ZS-91ismvdbeDQ",
    bg: "#010101",
  },
  {
    label: "Telegram",
    icon: FaTelegramPlane,
    href: "https://t.me/BNb11342",
    bg: "#229ED9",
  },
  // {
  //   label: "Telegram Account",
  //   icon: FaTelegramPlane,
  //   href: "https://t.me/TC1919",
  //   username: "@TC1919",
  //   bg: "#229ED9",
  // },
];

export default function NewContactUs() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col items-center justify-center">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <h2 className="heading-2 text-brand-dark font-khmer mb-8 text-center">
          Get in Touch
        </h2>
        <div className="flex flex-row gap-6 md:gap-32 lg:gap-64 justify-center items-center mb-8 w-full">
          {contacts.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 w-24 sm:w-32"
              >
                <div
                  className="rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: c.bg,
                    width: "3.5rem",
                    height: "3.5rem",
                    minWidth: "2.5rem",
                    minHeight: "2.5rem",
                    maxWidth: "4.5rem",
                    maxHeight: "4.5rem",
                  }}
                >
                  <Icon
                    size={32}
                    className="text-white w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <span className="body-base text-brand-secondary text-center font-khmer">
                  {c.label}
                </span>
              </a>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-2 text-brand-secondary">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-brand-primary" />
            <span className="body-lg font-medium font-khmer">
              070 94 38 38 / 060 94 3838 / 017 94 3838
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
