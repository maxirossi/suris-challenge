export interface Palindrome {
  uuid: string;
  word: string;
  isPalindrome: boolean;
  createdAt: Date;
  deletedAt?: Date | null;
  modifiedAt?: Date | null;
}