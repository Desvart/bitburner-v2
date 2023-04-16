export function deepFreeze(obj: any): any {
  // fetch property keys
  const propKeys = Object.getOwnPropertyNames(obj);

  // recursively freeze all properties
  propKeys.forEach((key) => {
    const propValue = obj[key];

    if (propValue && typeof propValue === 'object') deepFreeze(propValue);
  });

  return Object.freeze(obj);
}
