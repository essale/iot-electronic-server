const winston = require('winston');

class Logger {
    logger;

    constructor() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: './server/logs/nodeApp.log' })
            ]
        });
    }

    info(log) {
        console.log(log);
        this.logger.info(log);
    }

    debug(log) {
        this.logger.debug(log);
    }

    warn(log) {
        this.logger.warn(log);
    }

    error(log) {
        this.logger.error(log);
    }
}


export declare const logger: Logger;

