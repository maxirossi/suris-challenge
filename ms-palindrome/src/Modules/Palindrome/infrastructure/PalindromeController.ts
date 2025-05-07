import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { CreatedAt } from '../../Shared/domain/value-object/CreatedAt';
import { Page } from '../../Shared/domain/value-object/Page';
import { HttpResponseCodes } from '../../Shared/HttpResponseCodes';
import { PalindromeService } from '../application/services/PalindromeService';
import Logger from '../../Shared/domain/Logger';
import WinstonLogger from '../../Shared/infrastructure/WinstoneLogger';
import { GeneralConstants } from '../../Shared/constants';
import { ControllerError } from '../../Shared/domain/exceptions/ControllerException';

export class PalindromeController {
  private readonly palindromeService: PalindromeService;
  private readonly logger: Logger;

  constructor() {
    this.palindromeService = new PalindromeService();
    this.logger = new WinstonLogger();
  }

  async create(req: Request, res: Response) {
    try {
      const uuid = new Uuid(uuidv4());
      const createdAt = new CreatedAt(new Date());
      const word = req.body.word;

      if (!word || typeof word !== 'string') {
        return res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: 'Missing or invalid word' });
      }

      const existing = await this.palindromeService.findByWord(word);

      if (existing) {
        return res.status(HttpResponseCodes.OK).json({
          success: true,
          message: 'Palindrome already exists',
          palindrome: existing
        });
      }

      const response = await this.palindromeService.create(uuid.valueAsString, word, createdAt);
      if (response.success) {
        res.status(HttpResponseCodes.CREATED).json(response);
      } else {
        throw new ControllerError('Error creating palindrome', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await this.palindromeService.getAll(page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).send({
          status: GeneralConstants.STATUS_OK,
          palindromes: response.palindromes
        });
      } else {
        throw new ControllerError('Error getting all palindromes', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const uuidParam = req.params.palindromeId;
      const response = await this.palindromeService.getById(uuidParam);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        throw new ControllerError('Error getting palindrome by uuid', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const uuidParam = req.params.palindromeId;
      const response = await this.palindromeService.delete(uuidParam);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        throw new ControllerError('Error deleting palindrome', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
    }
  }

  async getLatest(req: Request, res: Response) {
    try {
      const limitParam = req.query.limit;
      const limit = parseInt(limitParam as string) || 5;

      const response = await this.palindromeService.getLatest(limit);

      if (response.success) {
        res.status(HttpResponseCodes.OK).send({
          status: GeneralConstants.STATUS_OK,
          palindromes: response.palindromes
        });
      } else {
        throw new ControllerError('Error getting latest palindromes', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
    }
  }

}
