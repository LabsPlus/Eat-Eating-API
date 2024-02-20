import * as errorsInterfaces from '../intefaces/error.helpers.interface'
/**
 * Classe base para erros personalizados.
 * @extends {Error}
 */
export class ErrorsHelpers extends Error {
    public readonly statusCode: number;

    /**
     * Cria uma nova instância de ErrorsHelpers.
     * @param {errorsInterfaces.IErrorsHelpers} {message, statusCode} - Detalhes do erro.
     */
    constructor({message, statusCode}: errorsInterfaces.IErrorsHelpers) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ErrorsHelpers';
    }
}

/**
 * Classe para erros de BadRequest (400).
 * @extends {ErrorsHelpers}
 */
export class BadRequestError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 400});
    }
}

/**
 * Classe para erros de NotFound (404).
 * @extends {ErrorsHelpers}
 */
export class NotFoundError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 404});
    }
}

/**
 * Classe para erros de Unauthorized (401).
 * @extends {ErrorsHelpers}
 */
export class UnauthorizedError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 401});
    }
}

/**
 * Classe para erros de Forbidden (403).
 * @extends {ErrorsHelpers}
 */
export class ForbiddenError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 403});
    }
}

/**
 * Classe para erros de Conflict (409).
 * @extends {ErrorsHelpers}
 */
export class ConflictError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 409});
    }
}

/**
 * Classe para erros de Too Many Requests (429).
 * @extends {ErrorsHelpers}
 */
export class TooManyRequestsError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 429});
    }
}

/**
 * Classe para erros de Internal Server Error (500).
 * @extends {ErrorsHelpers}
 */
export class InternalServerError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 500});
    }
}

/**
 * Classe para erros de Service Unavailable (503).
 * @extends {ErrorsHelpers}
 */
export class ServiceUnavailableError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 503});
    }
}

/**
 * Classe para erros de Variant Also Negotiates (506).
 * @extends {ErrorsHelpers}
 */
export class VariantAlsoNegotiatesError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 506});
    }

}
/**
 * Classe para erros de unsprocessed entity (422).
 * @extends {ErrorsHelpers}
 */
export class UnprocessedEntityError extends ErrorsHelpers {
    constructor({message}: errorsInterfaces.IMoreErrorsHelpers) {
        super({message, statusCode: 422});
}}

