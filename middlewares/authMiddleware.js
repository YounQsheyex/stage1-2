const jwt = require("jsonwebtoken");

const verifytoken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res
        .status(401)
        .json({ message: "Unauthorized to perform action" });
    }
    req.user = {
      userName: payload.userName,
      role: payload.role,
      userId: payload.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication Failed" });
  }
};

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Unauthorized to access this route" });
    }
    next();
  };
};

module.exports = { verifytoken, authorizedRoles };
