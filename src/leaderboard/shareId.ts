/** The public id of a score's share link: 8 random characters that read unambiguously (no 0/O, 1/l/I). */
const ID_CHARS = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const ID_PATTERN = /^[a-km-zA-HJ-NP-Z2-9]{8}$/;

export function newShareId() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return [...bytes].map((b) => ID_CHARS[b % ID_CHARS.length]).join('');
}
