export enum LogMode {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  UNDEFINED = 'UNDEFINED',
}

export class Log {
  constructor(private readonly logMode: LogMode = LogMode.INFO, private readonly logContext = '') {}

  error(message: string): string {
    if (
      this.logMode === LogMode.ERROR ||
      this.logMode === LogMode.WARNING ||
      this.logMode === LogMode.INFO ||
      this.logMode === LogMode.DEBUG
    ) {
      const logMessage = `${this.logContext} - ERROR - ${message}`;
      console.error(logMessage);
      return logMessage;
    }
    return '';
  }

  warning(message: string): string {
    if (
      this.logMode === LogMode.WARNING ||
      this.logMode === LogMode.INFO ||
      this.logMode === LogMode.DEBUG
    ) {
      const logMessage = `${this.logContext} - WARNING - ${message}`;
      console.warn(logMessage);
      return logMessage;
    }
    return '';
  }

  info(message: string): string {
    if (this.logMode === LogMode.INFO || this.logMode === LogMode.DEBUG) {
      const logMessage = `${this.logContext} - INFO - ${message}`;
      console.info(logMessage);
      return logMessage;
    }
    return '';
  }

  debug(message: string): string {
    if (this.logMode === LogMode.DEBUG) {
      const logMessage = `${this.logContext} - DEBUG - ${message}`;
      console.debug(logMessage);
      return logMessage;
    }
    return '';
  }
}

// todo: remove this function once hacket"1" can be decommissioned
export function log(logMode: LogMode = LogMode.DEBUG): Log {
  return new Log(logMode);
}
