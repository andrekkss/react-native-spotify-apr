class ClientCallbackNotFoundFailure extends Error {
    constructor() {
        super("Please, set ClientCallback in .env file");

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}
