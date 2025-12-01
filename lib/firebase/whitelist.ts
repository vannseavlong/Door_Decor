export const allowedAdmins = [
  process.env.NEXT_PUBLIC_ADMIN_EMAIL_1 ||
    process.env.ADMIN_EMAIL_1 ||
    "your-email@example.com",
  process.env.NEXT_PUBLIC_ADMIN_EMAIL_2 ||
    process.env.ADMIN_EMAIL_2 ||
    "boss@example.com",
];

export function isAllowedAdmin(email?: string | null) {
  if (!email) return false;
  console.log("Checking admin whitelist:", {
    email,
    allowedAdmins,
    isAllowed: allowedAdmins.includes(email),
  });
  return allowedAdmins.includes(email);
}
