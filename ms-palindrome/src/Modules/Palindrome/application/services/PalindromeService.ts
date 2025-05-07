import { CreatedAt } from '../../../Shared/domain/value-object/CreatedAt';
import { Page } from '../../../Shared/domain/value-object/Page';
import { InternalResponse } from '../../../Shared/dto/InternalResponse';
import { Palindrome } from '../../model/interfaces/Palindrome';
import { PalindromeRepository } from '../../model/repositories/PalindromeRepository';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import Logger from '../../../Shared/domain/Logger';
import { Constants } from '../../Shared/constants';
import { CaseUseException } from '../../../Shared/domain/exceptions/CaseUseException';

export class PalindromeService {
  private readonly palindromeRepository: PalindromeRepository;
  private readonly logger: Logger;
  constructor() {
    this.palindromeRepository = new PalindromeRepository();
    this.logger = new WinstonLogger();
  }

  async create(
    uuid: string,
    word: string,
    createdAt: CreatedAt
  ): Promise<InternalResponse> {
    try {
      const palindrome: Palindrome = {
        uuid,
        word,
        isPalindrome: this.isPalindrome(word),
        createdAt: createdAt.value
      };
      return await this.palindromeRepository.create(palindrome);
    } catch (error) {
      this.logger.error(error);
      throw new CaseUseException('Error creating palindrome');
    }
  }

  async getAll(page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await this.palindromeRepository.getAll(page.getValue(), perPage);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getById(uuid: string): Promise<any> {
    return await this.palindromeRepository.getById(uuid);
  }

  async delete(uuid: string): Promise<any> {
    return await this.palindromeRepository.delete(uuid);
  }

  private isPalindrome(word: string): boolean {
    const cleaned = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
    return cleaned === cleaned.split('').reverse().join('');
  }
  
}
