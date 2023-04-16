// https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators
// https://entwickler.de/typescript/typescript-5-new-changes
// https://javascript.plainenglish.io/ts-5-0-beta-new-decorators-are-here-5b13a383e4ad

// type ClassMethodDecorator = (value: Function, context: {
//   kind: "method";
//   name: string | symbol;
//   access: { get(): unknown };
//   static: boolean;
//   private: boolean;
//   addInitializer(initializer: () => void): void;
// }) => Function | void;

function logByType(type: string, msg: string): void {
  switch (type) {
    case 'log':
      console.log(msg);
      break;
    case 'info':
      console.info(msg);
      break;
    case 'warn':
      console.warn(msg);
      break;
    case 'err':
      console.error(msg);
      break;
    default:
      throw new Error(`Invalid log type: ${type}`);
  }
}

export function log(type = 'log') {
  return function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >
  ) {
    const { kind, name } = context;
    const methodName = String(name);

    if (kind !== 'method')
      throw new Error(
        `@loggedMethod can only be used on methods, not: ${kind}`
      );

    function replacementMethod(this: This, ...args: Args): Return {
      const before = `LOG: Entering method '${methodName}' with param '${args}'.`;
      logByType(type, before);
      args.forEach((arg) => {
        if (typeof arg === 'object') {
          console.dir(arg);
        }
      });

      const result = target.call(this, ...args);

      const after = `LOG: Exiting method '${methodName}' with result '${result}'.`;
      logByType(type, after);
      if (typeof result === 'object') {
        console.dir(result);
      }

      return result;
    }

    return replacementMethod;
  };
}
