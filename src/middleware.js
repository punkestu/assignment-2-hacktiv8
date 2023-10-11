const {HttpError} = require("./model");
const jwt = require("./jwt");

class Middleware {
    #userRepo;

    constructor(userRepo) {
        this.#userRepo = userRepo;
    }

    isAuth = async (req, res, next) => {
        const token = req.headers.authorization;
        try {
            if (!token) {
                throw new HttpError(401, {token: "token not provided"});
            }
            let user = jwt.Verify(token);
            if (!user) {
                throw new HttpError(401, {token: "token invalid"});
            }
            user = await this.#userRepo.Load()
                .then(users => users.filter(({id}) => id === user.id)[0]);
            if (!user) {
                throw new HttpError(401, {token: "user not valid"});
            }
            req.user = user;
            next();
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.code).json(err.errors);
            }
            console.log(typeof err);
            res.status(500).json(err);
        }
    }
}

module.exports = Middleware;