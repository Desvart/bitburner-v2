export enum LogMode {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

export class Log {
  constructor(private readonly logMode: LogMode = LogMode.INFO) {}

  error(message: string): void {
    if (
      this.logMode === LogMode.ERROR ||
      this.logMode === LogMode.WARNING ||
      this.logMode === LogMode.INFO ||
      this.logMode === LogMode.DEBUG
    ) {
      console.error(`ERR - ${message}`);
    }
  }

  warning(message: string): void {
    if (
      this.logMode === LogMode.WARNING ||
      this.logMode === LogMode.INFO ||
      this.logMode === LogMode.DEBUG
    ) {
      console.warn(`WARNING - ${message}`);
    }
  }

  info(message: string): void {
    if (this.logMode === LogMode.INFO || this.logMode === LogMode.DEBUG) {
      console.info(`INFO - ${message}`);
    }
  }

  debug(message: string): void {
    if (this.logMode === LogMode.DEBUG) {
      console.debug(`DEBUG - ${message}`);
    }
  }
}

// todo: remove this function once hacket"1" can be decommissioned
export function log(logMode: LogMode = LogMode.DEBUG): Log {
  return new Log(logMode);
}
