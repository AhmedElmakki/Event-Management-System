// backend/middleware/auth.js
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== admin) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}
