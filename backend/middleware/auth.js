// backend/middleware/auth.js
import jwt from "jsonwebtoken"

// Verify JWT and attach user to request
export function verifyToken(req, res, next){
  const authHeader = req.headers["authorization"]
  if (!authHeader) return res.status(401).json({ message: "No token provided" });


  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: "No token provided" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

}

// Require specific role
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

export const requireAdmin = [verifyToken, requireRole("admin")];