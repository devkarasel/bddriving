import crypto from 'crypto'

export function makeToken(password: string): string {
  return crypto.createHmac('sha256', 'bddriving-secret').update(password).digest('hex')
}

export function validateToken(token: string | undefined): boolean {
  if (!token) return false
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'
  return token === makeToken(adminPass)
}

export function isAuthenticated(req: Request): boolean {
  const auth = req.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) return validateToken(auth.slice(7))
  return false
}
