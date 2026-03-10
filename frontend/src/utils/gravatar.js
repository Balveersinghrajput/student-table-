/**
 * Generate a unique, realistic profile photo URL from an email.
 * Uses pravatar.cc — same email always returns the same human face.
 * Falls back to ui-avatars.com if needed.
 */
export function getAvatarUrl(email, size = 80) {
  if (!email) return null;
  const seed = encodeURIComponent(email.trim().toLowerCase());
  return `https://i.pravatar.cc/${size}?u=${seed}`;
}
