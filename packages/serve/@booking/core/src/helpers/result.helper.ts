export abstract class Result<T, E> {
    abstract isSuccess(): this is Success<T>;
    abstract isFailure(): this is Failure<E>;
}

export class Success<T> extends Result<T, never> {
    constructor(readonly value: T) {
        super();
    }

    isFailure(): this is Failure<never> {
        return false;
    }

    isSuccess(): this is Success<T> {
        return true;
    }
}

export class Failure<E> extends Result<never, E> {
    constructor(readonly error: E) {
        super();
    }

    isFailure(): this is Failure<E> {
        return true;
    }

    isSuccess(): this is Success<never> {
        return false;
    }
}
