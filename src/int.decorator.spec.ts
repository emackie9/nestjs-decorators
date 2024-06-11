import {
  RoundingPolicy,
  isBigInt,
  round,
  transformBigInt,
  transformInt,
} from './int.decorator';

describe('IntDecorator', () => {
  describe('isBigInt', () => {
    it('should return true if bigint maximum', () => {
      expect(isBigInt(922337203685477580n)).toEqual(true);
    });
    it('should return true if bigint minimum', () => {
      expect(isBigInt(-922337203685477580n)).toEqual(true);
    });
    it('should return true if bigint maximum as string', () => {
      expect(isBigInt('922337203685477580')).toEqual(true);
    });
    it('should return true if bigint minimum as string', () => {
      expect(isBigInt('-922337203685477580')).toEqual(true);
    });
    it('should return true if 0', () => {
      expect(isBigInt(0)).toEqual(true);
    });
    it('should return true if 0n', () => {
      expect(isBigInt(0n)).toEqual(true);
    });
    it('should return true if 1', () => {
      expect(isBigInt(1)).toEqual(true);
    });
    it('should return true if 1n', () => {
      expect(isBigInt(1n)).toEqual(true);
    });
    it('should return false if string number has decimals', () => {
      expect(isBigInt('0.43654')).toEqual(false);
    });
    it('should return false if number has decimals', () => {
      expect(isBigInt(0.43654)).toEqual(false);
    });
    it('should return false if not numeric', () => {
      expect(isBigInt('test')).toEqual(false);
    });
    it('should return false if empty', () => {
      expect(isBigInt('')).toEqual(false);
    });
    it('should return false if NaN', () => {
      expect(isBigInt(NaN)).toEqual(false);
    });
    it('should return false if object', () => {
      expect(isBigInt({})).toEqual(false);
    });
    it('should return false if null', () => {
      expect(isBigInt(null)).toEqual(false);
    });
    it('should return false if undefined', () => {
      expect(isBigInt(undefined)).toEqual(false);
    });
  });

  describe('transformBigInt', () => {
    it('should return the value if bigint', () => {
      expect(transformBigInt('922337203685477580')).toEqual(
        922337203685477580n,
      );
    });
    it('should return the value if bigint', () => {
      expect(transformBigInt(922337203685477580n)).toEqual(922337203685477580n);
    });
    it('should return the value if 0', () => {
      expect(transformBigInt(0)).toEqual(0n);
    });
    it('should return null if the string value has decimals', () => {
      expect(transformBigInt('0.5')).toEqual(null);
    });
    it('should return null if the value has decimals', () => {
      expect(transformBigInt(0.5)).toEqual(null);
    });
    it('should return 1 if the value has decimals and rounding policy', () => {
      expect(
        transformBigInt(0.5, { rounding: RoundingPolicy.DEFAULT }),
      ).toEqual(1n);
    });
    it('should return null if the value is not a number', () => {
      expect(transformBigInt('test')).toEqual(null);
    });
    it('should return null if the value is empty', () => {
      expect(transformBigInt('')).toEqual(null);
    });
    it('should return null if the value is NaN', () => {
      expect(transformBigInt(NaN)).toEqual(null);
    });
    it('should return null if the value is an object', () => {
      expect(transformBigInt({})).toEqual(null);
    });
    it('should return null if the value is null', () => {
      expect(transformBigInt(null)).toEqual(null);
    });
    it('should return null if the value is undefined', () => {
      expect(transformBigInt(undefined)).toEqual(null);
    });
  });

  describe('transformInt', () => {
    it('should return the value if int string', () => {
      expect(transformInt('1234')).toEqual(1234);
    });
    it('should return the value if int', () => {
      expect(transformInt(1234)).toEqual(1234);
    });
    it('should return the value if string 0', () => {
      expect(transformInt('0')).toEqual(0);
    });
    it('should return the value if 0', () => {
      expect(transformInt(0)).toEqual(0);
    });
    it('should return null if the string value has decimals', () => {
      expect(transformInt('0.5')).toEqual(null);
    });
    it('should return null if the value has decimals', () => {
      expect(transformInt(0.5)).toEqual(null);
    });
    it('should return 0 if the value has decimals and rounding policy', () => {
      expect(transformInt(0.5, { rounding: RoundingPolicy.DEFAULT })).toEqual(
        1,
      );
    });
    it('should return null if the value is not a number', () => {
      expect(transformInt('test')).toEqual(null);
    });
    it('should return null if the value is empty', () => {
      expect(transformInt('')).toEqual(null);
    });
    it('should return null if the value is NaN', () => {
      expect(transformInt(NaN)).toEqual(null);
    });
    it('should return null if the value is an object', () => {
      expect(transformInt({})).toEqual(null);
    });
    it('should return null if the value is undefined', () => {
      expect(transformInt(undefined)).toEqual(null);
    });
    it('should return null if the value is null', () => {
      expect(transformInt(null)).toEqual(null);
    });
  });

  describe('round', () => {
    it('should return 1 if the value is 1.5 and RoundingPolicy.FLOOR', () => {
      expect(round(1.5, RoundingPolicy.FLOOR)).toEqual(1);
    });
    it('should return 2 if the value is 1.5 and RoundingPolicy.CEIL', () => {
      expect(round(1.5, RoundingPolicy.CEIL)).toEqual(2);
    });
    it('should return 2 if the value is 1.5 and RoundingPolicy.DEFAULT', () => {
      expect(round(1.5, RoundingPolicy.DEFAULT)).toEqual(2);
    });
  });
});
