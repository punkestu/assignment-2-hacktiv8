const {Errors, HttpError} = require("./model");

class UseCase {
    #teacherRepo;
    #userRepo;

    constructor(teacherRepo, userRepo) {
        this.#teacherRepo = teacherRepo;
        this.#userRepo = userRepo;
    }

    Login(username, password) {
        return this.#userRepo.Load().then(async (users) => {
            const errors = new Errors();
            const user = users.filter(user => user.username === username)[0];
            if (!user) {
                errors.addError("username", "user with this username is not found");
            }
            if (!errors.check()) {
                throw new HttpError(400, errors);
            }
            if (user.password !== password) {
                errors.addError("password", "password is wrong");
            }
            if (!errors.check()) {
                throw new HttpError(400, errors);
            }
            return user;
        });
    }

    GetAllTeacher() {
        return this.#teacherRepo.Load();
    }
}

module.exports = UseCase;