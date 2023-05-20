export enum LogMode {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  UNDEFINED = 'UNDEFINED',
}

export class Log {
  #lastMessage = '';
  private logContext = '';
  constructor(private readonly logMode: LogMode = LogMode.INFO, logContext = '') {
    if (logContext !== '') {
      this.logContext = `${logContext} - `;
    }
  }

  error(message: string): string {
    if (
      this.logMode === LogMode.ERROR ||
      this.logMode === LogMode.WARNING ||
      this.logMode === LogMode.INFO ||
      this.logMode === LogMode.DEBUG
    ) {

      this.#lastMessage = `${this.logContext}ERROR - ${message}`;
      console.error(this.#lastMessage);
      return this.#lastMessage;
    }
    return 'skip';
  }

  warning(message: string): string {
    if (
      this.logMode === LogMode.WARNING ||
      this.logMode === LogMode.INFO ||
      this.logMode === LogMode.DEBUG
    ) {
      this.#lastMessage = `${this.logContext}WARNING - ${message}`;
      console.warn(this.#lastMessage);
      return this.#lastMessage;
    }
    return 'skip';
  }

  info(message: string): string {
    if (this.logMode === LogMode.INFO || this.logMode === LogMode.DEBUG) {
      this.#lastMessage = `${this.logContext}INFO - ${message}`;
      console.info(this.#lastMessage);
      return this.#lastMessage;
    }
    return 'skip';
  }

  debug(message: string): string {
    if (this.logMode === LogMode.DEBUG) {
      this.#lastMessage = `${this.logContext}DEBUG - ${message}`;
      console.debug(this.#lastMessage);
      return this.#lastMessage;
    }
    return 'skip';
  }

  // For testing purposes
  get lastMessage(): string {
    return this.#lastMessage;
  }
}

// todo: remove this function once hacket"1" can be decommissioned
export function log(logMode: LogMode = LogMode.DEBUG): Log {
  return new Log(logMode);
}
