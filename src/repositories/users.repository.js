export default class UsersRepository {
    constructor(usersModel) {
        this.usersModel = usersModel
    }
    async getAll() {
        return await this.usersModel.getAll()
    }
    async getById(id) {
        return await this.usersModel.getById(id)
    }
}
export { UsersRepository }
