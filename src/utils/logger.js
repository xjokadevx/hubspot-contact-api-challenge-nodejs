import { createLogger, format, transports } from 'winston';

const loggerFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} - [${level}] : ${message}`;
});

const customLogger = () =>
  createLogger({
    level: 'info',
    format: format.combine(
      format.colorize(),
      format.splat(),
      format.timestamp(),
      format.align(),
      loggerFormat
    ),
    transports: [new transports.Console()],
    exceptionHandlers: [
      new transports.File({ filename: 'logs/exception.log' }),
    ],
    rejectionHandlers: [
      new transports.File({ filename: 'logs/rejections.log' }),
    ],
  });
export default customLogger();
