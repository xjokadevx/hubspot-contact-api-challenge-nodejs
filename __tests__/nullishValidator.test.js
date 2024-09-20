const { nullishValidator } = require('../src/utils/validators');

describe('nullishValidator', () => {
  it('should return true if value is null or undefined', () => {
    expect(nullishValidator(null)).toBe(true);
    expect(nullishValidator(undefined)).toBe(true);
  });
  it('should return true if value is not null or undefined but is 0, empty string, empty object or empty array', () => {
    expect(nullishValidator(0)).toBe(true);
    expect(nullishValidator({})).toBe(true);
    expect(nullishValidator([])).toBe(true);
    expect(nullishValidator('')).toBe(true);
    expect(nullishValidator('null')).toBe(true);
    expect(nullishValidator('undefined')).toBe(true);
    expect(nullishValidator('0')).toBe(true);
    expect(nullishValidator('{}')).toBe(true);
    expect(nullishValidator('[]')).toBe(true);
  });
  it('should return false if value is not null or undefined', () => {
    const _tmpMock_obj = {
      test: 'test',
    };
    const _tmpMock_arr = ['test'];
    expect(nullishValidator('test')).toBe(false);
    expect(nullishValidator(_tmpMock_obj)).toBe(false);
    expect(nullishValidator(_tmpMock_arr)).toBe(false);
  });
});
