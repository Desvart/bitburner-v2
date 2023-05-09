import { deepFreeze } from '../deep-freeze';

describe('Deep freeze', () => {
  let obj: any;
  beforeEach(() => {
    obj = {
      a: 1,
      b: {
        c: 2,
      },
    };
  });

  test('Check that first level properties are frozen', () => {
    const frozenObj = deepFreeze(obj);
    function editObj() {
      frozenObj.a = 2;
    }

    expect(editObj).toThrow();
  });

  test('Check that 2nd level properties are frozen', () => {
    const frozenObj = deepFreeze(obj);
    function editObj() {
      frozenObj.b.c = 0;
    }

    expect(editObj).toThrow();
  });
});
