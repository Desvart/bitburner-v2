export enum LogMode {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

export class Log {
  constructor(private readonly logMode: LogMode = LogMode.INFO) {}

  // eslint-disable-next-line class-methods-use-this
  error(message: string): string {
    const logMessage = `ERROR - ${message}`;
    console.error(logMessage);
    return logMessage;
  }

  warning(message: string): string {
    if (
      this.logMode === LogMode.WARNING ||
      this.logMode === LogMode.INFO ||
      this.logMode === LogMode.DEBUG
    ) {
      const logMessage = `WARNING - ${message}`;
      console.warn(logMessage);
      return logMessage;
    }
    return '';
  }

  info(message: string): string {
    if (this.logMode === LogMode.INFO || this.logMode === LogMode.DEBUG) {
      const logMessage = `INFO - ${message}`;
      console.info(logMessage);
      return logMessage;
    }
    return '';
  }

  debug(message: string): string {
    if (this.logMode === LogMode.DEBUG) {
      const logMessage = `DEBUG - ${message}`;
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
