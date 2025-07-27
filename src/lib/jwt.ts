import { jwtVerify } from "jose";

// Use a secure secret (same one used during sign-in)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

/**
 * Verifies a JWT token and returns the payload if valid.
 * @param token The JWT token string
 */
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
