import { replacer, reviver } from '../json-map-serialization';

describe('JSON map serialization', () => {
  test('Serialize and deserialize', () => {
    const map = new Map<string, number>();
    map.set('a', 1);
    map.set('b', 2);

    const serializedMap = JSON.stringify(map, replacer);
    const deserializedMap = JSON.parse(serializedMap, reviver);

    expect(deserializedMap).toEqual(map);
  });
});
