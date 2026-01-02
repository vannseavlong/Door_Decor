export function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">{children}</div>;
}

// export { default as ImageUpload } from "./ImageUpload";
// export { default as MultipleImageUpload } from "./MultipleImageUpload";
export { default as HeroSection } from "./HeroSection";
export { default as AboutTab } from "./AboutTab";
export { default as ProductsTab } from "./ProductsTab";
export { default as CategoriesTab } from "./CategoriesTab";
export { default as InstallationTab } from "./InstallationTab";
export { default as MessagesTab } from "./MessagesTab";
export { default as FooterTab } from "./FooterTab";
export { default as ProductModal } from "./ProductModal";
export { default as CategoryModal } from "./CategoryModal";
export { default as InstallationModal } from "./InstallationModal";
export { default as AdminBottomBar } from "./AdminBottomBar";
