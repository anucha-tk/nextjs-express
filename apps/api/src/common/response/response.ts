import { Response } from "express";

// Helper code for the API consumer to understand the error and handle is accordingly
enum StatusCode {
  SUCCESS = "10000",
  FAILURE = "10001",
  RETRY = "10002",
  INVALID_ACCESS_TOKEN = "10003",
}

enum ResponseStatus {
  SUCCESS = 200,
  CREATE_SUCCESS = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  Unprocessable_Content = 422,
  INTERNAL_ERROR = 500,
}

//* abstract
class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
  ): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  /**
   * @function sanitize
   * @desc this fuc sanitize response undefined and delete status code
   */
  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error") {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}
export class ForbiddenResponse extends ApiResponse {
  constructor(message = "Forbidden") {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}
export class BadRequestResponse extends ApiResponse {
  constructor(message = "Bad Parameters") {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}
export class AuthFailureResponse extends ApiResponse {
  constructor(message = "Authentication Failure") {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}
export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

/*-------------------------------------------------------------------------*/
// Below all Response class is send res
/*-------------------------------------------------------------------------*/

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;
  constructor(message = "Not Found") {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }
  send(res: Response): Response {
    this.url = res.req.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(
    message: string,
    protected data: T,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}
export class SuccessCreateResponse<T> extends ApiResponse {
  constructor(
    message: string,
    protected data: T,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.CREATE_SUCCESS, message);
  }
  send(res: Response): Response {
    return super.prepare<SuccessCreateResponse<T>>(res, this);
  }
}
export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = "refresh_token";

  constructor(message = "Access token invalid") {
    super(
      StatusCode.INVALID_ACCESS_TOKEN,
      ResponseStatus.UNAUTHORIZED,
      message,
    );
  }

  send(res: Response): Response {
    res.setHeader("instruction", this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}
export class TokenRefreshResponse extends ApiResponse {
  constructor(
    message: string,
    protected accessToken: string,
    protected refreshToken: string,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
export class UnprocessableContentResponse<T> extends ApiResponse {
  constructor(
    message: string = "Unprocessable Content",
    protected data: T,
  ) {
    super(StatusCode.FAILURE, ResponseStatus.Unprocessable_Content, message);
  }
  send(res: Response): Response {
    return super.prepare<UnprocessableContentResponse<T>>(res, this);
  }
}
