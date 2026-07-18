const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000
const ADMIN_PASS_HASH = "cd4de393a3903d751ae2a691e2db6e886fe2a71b7b78e883c8700bcd2d911ef8"

export function validateSession(token: string | null): boolean {
  if (!token) return false
  try {
    const decoded = atob(token)
    const [hash, timestamp] = decoded.split(":")
    const age = Date.now() - parseInt(timestamp, 10)
    return hash === ADMIN_PASS_HASH && age > 0 && age < SESSION_MAX_AGE_MS
  } catch {
    return false
  }
}

export function getAuthFromRequest(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false
  return validateSession(authHeader.slice(7))
}
