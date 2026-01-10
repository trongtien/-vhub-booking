import { Result, Success, Failure } from './result.helper';

describe('Result Helper', () => {
  describe('Success', () => {
    it('should create a success result with a value', () => {
      const value = 'test value';
      const result = new Success(value);

      expect(result.value).toBe(value);
      expect(result.isSuccess()).toBe(true);
      expect(result.isFailure()).toBe(false);
    });

    it('should work with different types', () => {
      const numberResult = new Success(42);
      const objectResult = new Success({ id: 1, name: 'test' });

      expect(numberResult.value).toBe(42);
      expect(objectResult.value).toEqual({ id: 1, name: 'test' });
    });
  });

  describe('Failure', () => {
    it('should create a failure result with an error', () => {
      const error = 'test error';
      const result = new Failure(error);

      expect(result.error).toBe(error);
      expect(result.isSuccess()).toBe(false);
      expect(result.isFailure()).toBe(true);
    });

    it('should work with different error types', () => {
      const errorResult = new Failure(new Error('Something went wrong'));
      const stringResult = new Failure('Simple error message');

      expect(errorResult.error).toBeInstanceOf(Error);
      expect(stringResult.error).toBe('Simple error message');
    });
  });

  describe('Result type guards', () => {
    it('should correctly identify Success types', () => {
      const result: Result<string, Error> = new Success('data');

      if (result.isSuccess()) {
        expect(result.value).toBe('data');
      } else {
        fail('Expected Success result');
      }
    });

    it('should correctly identify Failure types', () => {
      const result: Result<string, string> = new Failure('error');

      if (result.isFailure()) {
        expect(result.error).toBe('error');
      } else {
        fail('Expected Failure result');
      }
    });
  });
});
