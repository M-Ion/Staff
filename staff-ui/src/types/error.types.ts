export enum ErrorStatus {
  AccessNotAllowed = "AccessNotAllowed",
  Invalid = "NotValid",
  InvalidFileExtension = "InvalidFileExtension",
  InvalidFiltering = "InvalidFiltering",
  InvalidGrouping = "InvalidGrouping",
  InvalidToken = "InvalidToken",
  NotFound = "NotFound",
}

export interface CustomError {
  Message: string;
  Status: ErrorStatus;
  StatusCode: number;
}

export interface HandledError {
  data: CustomError;
}
