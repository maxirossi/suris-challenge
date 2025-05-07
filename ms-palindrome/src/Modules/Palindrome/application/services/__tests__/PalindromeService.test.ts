import { PalindromeService } from '../PalindromeService';

describe('PalindromeService', () => {
  let service: PalindromeService;

  beforeEach(() => {
    service = new PalindromeService();
  });

  describe('isPalindrome', () => {
    it('should return true for a valid palindrome', () => {
      expect(service.isPalindrome('neuquen')).toBe(true);
      expect(service.isPalindrome('Reconocer')).toBe(true);
      expect(service.isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
      expect(service.isPalindrome('12321')).toBe(true);
    });

    it('should return false for a non-palindrome', () => {
      expect(service.isPalindrome('hello')).toBe(false);
      expect(service.isPalindrome('palindrome')).toBe(false);
      expect(service.isPalindrome('123abc')).toBe(false);
    });

    it('should handle empty strings', () => {
      expect(service.isPalindrome('')).toBe(true);
    });

    it('should ignore case and non-alphanumeric characters', () => {
      expect(service.isPalindrome('Was it a car or a cat I saw?')).toBe(true);
      expect(service.isPalindrome('No "x" in Nixon')).toBe(true);
    });
  });
});
