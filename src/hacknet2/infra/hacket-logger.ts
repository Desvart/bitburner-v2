import { Log, LogMode } from '/utils/logger';

export function log(logMode: LogMode = LogMode.DEBUG): Log {
  return new Log(logMode);
}
