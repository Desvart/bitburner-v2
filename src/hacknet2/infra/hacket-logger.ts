import { Log, LogMode } from '/utils/logger';

export function log(logMode: LogMode = LogMode.DEBUG): Log {
  const logContext = 'HACKNET';
  return new Log(logMode, logContext);
}
