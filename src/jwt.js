const jwt = require("jsonwebtoken");
const SECRET = "rahasia";
module.exports = {
    Sign: (payload) => {
        return jwt.sign(JSON.stringify(payload), SECRET);
    },
    Verify: (token) => {
        return jwt.verify(token, SECRET);
    }
}