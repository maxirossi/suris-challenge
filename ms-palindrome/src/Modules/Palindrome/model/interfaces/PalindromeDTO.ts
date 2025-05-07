import { Palindrome} from './Palindrome';

export interface PalindromeDTO {
  success?: boolean;
  message?: string;
  palindromes?: Palindrome[];
}