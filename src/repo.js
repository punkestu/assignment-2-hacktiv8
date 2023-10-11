const fs = require("fs");
const path = require("path");

class Repo {
    #source;
    #model;
    constructor(source, model) {
        this.#source = source;
        this.#model = model;
    }
    Load() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, `/../datasource/${this.#source}.json`), (err, data) => {
                if (err) return reject(err);
                resolve(JSON.parse(data.toString()).map(record=>new this.#model(record)));
            });
        });
    }
}

module.exports = Repo;