"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
/**
 * Checks whether the given value is an object with a `message` property of type string.
 */
function isErrorWithMessage(error) {
    return (typeof error === "object" &&
        error !== null &&
        typeof error.message === "string");
}
/**
 * Converts an error-like object to an `ErrorWithMessage`, or creates a new `ErrorWithMessage`
 * with a string representation of the input if it is not already an error-like object.
 */
function toErrorWithMessage(maybeError) {
    if (isErrorWithMessage(maybeError)) {
        if ("stack" in maybeError) {
            return maybeError;
        }
        return {
            message: maybeError.message,
        };
    }
    return {
        message: String(maybeError),
    };
}
/**
 * Returns the error message of an error-like object, or a string representation of the input
 * if it is not an error-like object.
 */
function getErrorMessage(error) {
    return toErrorWithMessage(error).message;
}
exports.getErrorMessage = getErrorMessage;
