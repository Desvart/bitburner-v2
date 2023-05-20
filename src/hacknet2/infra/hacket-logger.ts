import { Log, LogMode } from '/utils/logger';

export function log(classContext = '', logMode: LogMode = LogMode.DEBUG): Log {
  const MODULE_CONTEXT = 'HACKNET';

  let link = '';
  if (classContext !== '') {
    link = ' - ';
  }

  const logContext = `${MODULE_CONTEXT}${link}${classContext}`;
  return new Log(logMode, logContext);
}
