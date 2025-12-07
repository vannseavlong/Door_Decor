import Link from "next/link";
import { FaHome, FaInfoCircle, FaPhone, FaDoorOpen } from "react-icons/fa";

// You can adjust the icons or use your own SVGs if preferred
const menu = [
  {
    label: "Home",
    href: "/",
    icon: <FaHome size={24} />,
  },
  {
    label: "Products",
    href: "/product", // Or open a modal for categories
    icon: <FaDoorOpen size={24} />,
  },
  {
    label: "About",
    href: "/about",
    icon: <FaInfoCircle size={24} />,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <FaPhone size={24} />,
  },
];

const BottomBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#f7941d] text-white flex justify-around items-center h-16 shadow-md md:hidden">
      {menu.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-col items-center justify-center gap-1 hover:text-blue-300 transition-colors"
        >
          {item.icon}
          <span className="text-xs font-semibold">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomBar;
