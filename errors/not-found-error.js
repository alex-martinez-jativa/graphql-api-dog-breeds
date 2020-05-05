module.exports = class NotFoundError extends Error {
    constructor(...args) {
        super(...args)

        this.name = NotFoundError.name
    }
}