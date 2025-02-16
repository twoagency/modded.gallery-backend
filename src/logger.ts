import winston from "winston";
import { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import chalk from "chalk";

const logLevels = {
  crit: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

const levelColors = {
  crit: chalk.bgRed.white.bold,
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.cyan,
  debug: chalk.magenta
};

const fileTransport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  format: format.combine(
    format.timestamp(),
    format.json()
  )
});

const consoleTransport = new winston.transports.Console({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, route }) => {
      const coloredLevel = levelColors[level as keyof typeof levelColors]?.(`${level.toUpperCase()}`.padEnd(6)) || level;
      return [
        `${chalk.gray(timestamp)}`,
        coloredLevel,
        route ? chalk.white(`[${route}]`) : "",
        message
      ].join(" ").trim();
    })
  )
});

const logger = winston.createLogger({
  levels: logLevels,
  level: "debug",
  transports: [fileTransport, consoleTransport]
});

export default logger;