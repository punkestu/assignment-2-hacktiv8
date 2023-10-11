class Teacher {
    id;
    first_name;
    last_name;
    email;
    gender;

    constructor({id, first_name, last_name, email, gender}) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.gender = gender;
    }

    full_name() {
        return this.first_name + this.last_name;
    }
}

class User {
    id;
    username;
    password;

    constructor({id, username, password}) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

class Errors {
    errors;

    constructor() {
        this.errors = {};
    }

    check() {
        return Object.keys(this.errors).length === 0;
    }

    addError(field, error) {
        if (!this.errors[field]) this.errors[field] = [];
        this.errors[field].push(error);
    }
}

class HttpError {
    code;
    errors;

    constructor(code, errors) {
        this.code = code;
        this.errors = errors;
    }
}

module.exports = {Teacher, User, Errors, HttpError};