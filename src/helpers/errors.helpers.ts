import * as errorsInterfaces from '../intefaces/error.helpers.interface'

export class ErrorsHelpers extends Error {
    public readonly statusCode: number;

    constructor({message, statusCode}: errorsInterfaces.IErrorsHelpers) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ErrorsHelpers';
    }
}

export class BadRequestError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 400});
    }
}

export class UnauthorizedError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 401});
    }
}

export class NotFoundError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 404});
    }
}

export class TooManyRequestsError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 429});
    }
}

export class VariantAlsoNegotiatesError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 506});
    }
}
