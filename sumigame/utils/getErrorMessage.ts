type ErrorWithMessage = {
  message: string;
};

/**
 * Checks whether the given value is an object with a `message` property of type string.
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

/**
 * Converts an error-like object to an `ErrorWithMessage`, or creates a new `ErrorWithMessage`
 * with a string representation of the input if it is not already an error-like object.
 */
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) {
    if ("stack" in maybeError) {
      return maybeError as ErrorWithMessage;
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
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
