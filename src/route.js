module.exports = function (handler, authMid) {
    const router = require("express").Router();
    router.post("/login", handler.Login);
    router.get("/teachers", authMid.isAuth, handler.GetTeachers);
    return router;
}