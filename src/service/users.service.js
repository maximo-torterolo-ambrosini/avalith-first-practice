class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }
    async getAll() {
        try {
            const users = await this.usersRepository.getAll()
            return users
        } catch (error) {
            return error
        }
    }
    async getById(id) {
        try {
            const user = await this.usersRepository.getById(id)
            return user
        } catch (error) {
            return error
        }
    }
    async getFirsts() {
        const USERS_LIMIT = 3
        try {
            const users = await this.usersRepository.getAll()
            return users.slice(0, USERS_LIMIT)
        } catch (error) {
            return error
        }
    }
}

export default UsersService
export { UsersService }
