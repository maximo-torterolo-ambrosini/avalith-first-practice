export default class CartsService {
    constructor(cartsRepository, usersRepository) {
        this.cartsRepository = cartsRepository
        this.usersRepository = usersRepository
    }
    async getAll() {
        try {
            const carts = await this.cartsRepository.getAll()
            return carts
        } catch (error) {
            return error
        }
    }
    async getById(id) {
        try {
            const cart = await this.cartsRepository.getById(id)
            return cart
        } catch (error) {
            return error
        }
    }

    async getBiggerCarts() {
        const CART_SIZE = 3
        try {
            const carts = await this.cartsRepository.getAll()
            const biggerCarts = await Promise.all(
                carts
                    .filter((cart) => cart.products.length >= CART_SIZE)
                    .map(async ({ userId, ...rest }) => {
                        const { username } = await this.usersRepository.getById(userId)

                        return { username, ...rest }
                    })
            )
            return biggerCarts
        } catch (error) {
            return error
        }
    }
}

export { CartsService }
