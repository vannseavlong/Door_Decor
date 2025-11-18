export const allowedAdmins = [
  process.env.ADMIN_EMAIL_1 || "your-email@example.com",
  process.env.ADMIN_EMAIL_2 || "boss@example.com",
];

export function isAllowedAdmin(email?: string | null) {
  if (!email) return false;
  return allowedAdmins.includes(email);
}
