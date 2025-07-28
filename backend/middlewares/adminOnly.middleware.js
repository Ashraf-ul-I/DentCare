export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // user is admin, proceed
  } else {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};
