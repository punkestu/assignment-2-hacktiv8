const Repo = require("./repo");
const UseCase = require("./usecase");
const Handler = require("./handler");
const Middleware = require("./middleware");
const {Teacher, User} = require("./model");
module.exports = function () {
    const teacherRepo = new Repo("teachers", Teacher);
    const userRepo = new Repo("users", User);
    const useCase = new UseCase(teacherRepo, userRepo);
    const handler = new Handler(useCase);
    const authMid = new Middleware(userRepo);
    return require("./route")(handler, authMid);
}