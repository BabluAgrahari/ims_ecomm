import winston from 'winston';
import path from 'path';
import fs from 'fs';
import 'winston-daily-rotate-file';


const rootDir = path.resolve();

const logDir = path.join(rootDir, 'src', 'Storage', 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Create a new Winston logger with daily rotation
const logTransport = new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false, // Option to zip old log files to save space
    maxSize: '100m', // Maximum size for a log file (after which it will rotate)
    maxFiles: '60d', // Keep logs for the last 14 days
});

// Create the logger with console and file transports
const logger = winston.createLogger({
    level: 'info', // Set the log level
    format: winston.format.combine(
        winston.format.timestamp(), // Include timestamp in each log entry
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }), // Console log with colorization
        logTransport,
    ],
});
export default logger;
