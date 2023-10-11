const {HttpError} = require("./model");
const jwt = require("./jwt");

class Handler {
    #usecase;

    constructor(usecase) {
        this.#usecase = usecase;
    }

    Login = async (req, res) => {
        const {username, password} = req.body;
        try {
            const user = await this.#usecase.Login(username, password);
            res.json({
                token: jwt.Sign({id: user.id})
            });
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.code).json(err.errors);
            }
            res.status(500).json(err);
        }
    }

    GetTeachers = async (req, res) => {
        try {
            const teachers = await this.#usecase.GetAllTeacher();
            res.json(teachers);
        }catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.code).json(err.errors);
            }
            res.status(500).json(err);
        }
    }
}

module.exports = Handler;