function checkSession(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || Date.now() > decoded.exp) {
      return res.status(401).send("Session expired");
    }
    req.user = decoded;
    next();
  });
}
