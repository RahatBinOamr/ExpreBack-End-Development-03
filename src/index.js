const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 4000;
const jwt = require("jsonwebtoken");
async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/productData");
    console.log("database connection successful");
  } catch (err) {
    console.log(err.message);
  }
}
main();

function generateToken(userId, secretKey) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
}

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.listen(port, () => {
  console.log(`Product app listening on port ${port}`);
});
