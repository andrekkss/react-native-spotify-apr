class ClientIDNotFoundFailure extends Error {
    constructor() {
        super("Please, set ClientID in .env file");

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}
