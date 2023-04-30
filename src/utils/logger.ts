export enum LogMode {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  ERROR = 'ERROR',
  NONE = 'NONE',
}

export class Log {
  #debugMode: LogMode = LogMode.INFO;
  constructor(debugMode: LogMode) {
    this.#debugMode = debugMode;
  }

  setDebugMode(debugMode: LogMode): void {
    this.#debugMode = debugMode;
  }

  error(message: string): void {
    if (
      this.#debugMode === LogMode.ERROR ||
      this.#debugMode === LogMode.INFO ||
      this.#debugMode === LogMode.DEBUG
    ) {
      console.error(`ERR - ${message}`);
    }
  }

  info(message: string): void {
    if (this.#debugMode === LogMode.INFO || this.#debugMode === LogMode.DEBUG) {
      console.info(`INFO - ${message}`);
    }
  }

  debug(message: string): void {
    if (this.#debugMode === LogMode.DEBUG) {
      console.warn(`DEBUG - ${message}`);
    }
  }
}

export function log(logMode: LogMode = LogMode.INFO): Log {
  return new Log(logMode);
}
