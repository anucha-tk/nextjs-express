import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const logLevel = process.env.NODE_ENV === "development" ? "debug" : "warn";

const options = {
  file: {
    level: logLevel,
    filename: "/%DATE%.log",
    dirname: "./logs",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: "20m",
    maxFiles: "14d",
  },
};

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
        format.label({
          label: `🏷️`,
        }),
        format.timestamp({
          format: "MMM-DD-YYYY HH:mm:ss",
        }),
        format.printf(
          (info) =>
            `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`,
        ),
      ),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
