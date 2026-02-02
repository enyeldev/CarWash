import { $ZodIssue } from "zod/v4/core";
import { APIError } from "better-auth/api";

type PayLoadErrorCode =
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "BAD_REQUEST"
  | "INTERNAL_ERROR";

export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;

  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  readonly code = "NOT_FOUND";
  readonly statusCode = 404;

  constructor(message = "Resource not found") {
    super(message);
  }
}

export class UnauthorizedError extends AppError {
  readonly code = "UNAUTHORIZED";
  readonly statusCode = 401;

  constructor(message = "Unauthorized") {
    super(message);
  }
}

export class BadRequestError extends AppError {
  readonly code = "BAD_REQUEST";
  readonly statusCode = 400;

  constructor(message = "Bad Request") {
    super(message);
  }
}

export class ValidationAppError extends AppError {
  readonly code = "VALIDATION_ERROR";
  readonly statusCode = 422;

  constructor(
    public readonly issues: $ZodIssue[],
    message = "Validation failed",
  ) {
    super(message);
  }
}

export type AppErrorPayload =
  | {
      code: "VALIDATION_ERROR";
      message: string;
      issues: $ZodIssue[];
    }
  | {
      code: PayLoadErrorCode;
      message: string;
    };

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppErrorPayload };

export function mapErrorToPayload(error: unknown): AppErrorPayload {
  if (error instanceof ValidationAppError) {
    return {
      code: error.code,
      message: error.message,
      issues: error.issues,
    };
  }

  if (error instanceof AppError) {
    return {
      code: error.code as PayLoadErrorCode,
      message: error.message,
    };
  }

  if (error instanceof APIError) {
    return {
      code: "BAD_REQUEST",
      message: error.message,
    };
  }

  console.error(error);

  return {
    code: "INTERNAL_ERROR",
    message: "Unexpected error",
  };
}
