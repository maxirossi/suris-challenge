// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import Logger from '../../../Shared/domain/Logger';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import { InternalResponse } from '../../../Shared/dto/InternalResponse';
import { Palindrome} from '../interfaces/Palindrome';
import { PalindromeDTO } from '../interfaces/PalindromeDTO';

export class PalindromeRepository {
  private prisma: PrismaClient;
  private readonly logger: Logger;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = new WinstonLogger();
  }

  async create(data: Palindrome): Promise<InternalResponse> {
    try {
      const {...createData } = data; 
      await this.prisma.palindrome.create({ data: createData });
      return { success: true, message: 'Palindrome created successfully' };
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error creating palindrome' };
    }
  }

  async getAll(page: number, perPage: number): Promise<PalindromeDTO> {
    try {
      const skip = (page - 1) * perPage;
      const palindromes = await this.prisma.palindrome.findMany({
        where: { active: true },
        skip,
        take: perPage
      });
      return { success: true, message: 'Palindromes retrieved successfully', palindromes };
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error retrieving palindromes' };
    }
  }

  async getById(uuid: string): Promise<PalindromeDTO> {
    try {
      const palindrome = await this.prisma.palindrome.findUnique({
        where: { uuid, active: true }
      });
      if (palindrome) {
        return { success: true, palindromes:palindrome};
      } else {
        return { success: false };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Cannot get palindrome' };
    }
  }

  async update(uuid: string, data: Palindrome): Promise<InternalResponse> {
    try {
      const existing = await this.prisma.palindrome.findUnique({
        where: { uuid, active: true }
      });
      if (existing) {
        const { ...updatedData } = data; 
        await this.prisma.palindrome.update({
          where: { uuid },
          data: updatedData
        });
        return { success: true, message: 'Palindrome updated successfully' };
      } else {
        return { success: false, message: 'Palindrome not found' };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error updating palindrome' };
    }
  }

  async delete(uuid: string): Promise<InternalResponse> {
    try {
      const palindrome = await this.prisma.palindrome.findUnique({
        where: { uuid }
      });
      if (palindrome) {
        await this.prisma.palindrome.update({
          where: { uuid },
          data: { active: false, deletedAt: new Date() }
        });
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false };
    }
  }

  async getByWord(word: string): Promise<PalindromeDTO> {
    try {
      const palindrome = await this.prisma.palindrome.findUnique({
        where: { word, active: true }
      });

      if (palindrome) {
        return { success: true, palindromes:palindrome };
      } else {
        return { success: false };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Cannot get palindrome by word' };
    }
  }

  async getLatest(limit: number): Promise<PalindromeDTO> {
    try {
      const palindromes = await this.prisma.palindrome.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' },
        take: limit
      });
  
      return { success: true, message: 'Latest palindromes retrieved successfully', palindromes };
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error retrieving latest palindromes' };
    }
  }
  
  async findByWord(word: string): Promise<Palindrome | null> {
    const result = await this.prisma.palindrome.findUnique({
      where: { word }
    });
  
    if (!result) return null;
  
    return new Palindrome(
      new Uuid(result.uuid),
      new Word(result.word),
      new IsPalindrome(result.is_palindrome),
      new CreatedAt(result.created_at),
      result.deleted_at ? new DeletedAt(result.deleted_at) : undefined,
      result.modified_at ? new ModifiedAt(result.modified_at) : undefined
    );
  }
  
  
}
