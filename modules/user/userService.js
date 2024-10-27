const { generationId } = require("../../lib/generationId");
const { ResData } = require("../../lib/resData");
const { Repository } = require("../../lib/repository")
const { join } = require("node:path")

class UserService{
    #repository;
    constructor(repository){
        this.#repository = repository;
    }

    async getAll(){
        const data = await this.#repository.read();

        const resData = new ResData(200, "success", data)
        return resData;
    }

    async getByLogin(login){
        const data = await this.#repository.read();

        const fondUserByLogin = data.find(el => el.login === login)

        const resData = new ResData(200, "success", fondUserByLogin)

        if (!fondUserByLogin) {
            resData.status = 404;
            resData.message = "user not found"
        }
        return resData;
    }

    async create(body){
        const newId = generationId();

        body.id = newId;

        const data = await this.#repository.read()

        data.push(body)

        await this.#repository.write(data)

        const resData = new ResData(201, "created", body)

        return resData
    }
}

const userDbUrl = join(__dirname, "../../database/users.json")

const repository = new Repository(userDbUrl);

const userService = new UserService(repository)

module.exports = { userService }