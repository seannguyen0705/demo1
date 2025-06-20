export default function isExpired(dateString?: string) {
  if (!dateString) {
    return false;
  }
  const expiredAt = new Date(dateString);
  const now = new Date();
  return expiredAt < now;
}
