import { Router, Request, Response } from 'express';
/* controllers */
import { UsersController } from '../Modules/User/infrastructure/UsersController';
import { PalindromeController } from '../Modules/Palindrome/infrastructure/PalindromeController';

const router = Router();
const usersController = new UsersController();
const palindromeController = new PalindromeController();

/* Health Check */

router.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    status: 'OK',
    message: 'Success'
  });
});

/* Users Routes */

router.post('/v1/users', (req: Request, res: Response) => usersController.createUser(req, res));
router.get('/v1/users', (req: Request, res: Response) => usersController.getAllUsers(req, res));
router.get('/v1/users/:userId', (req: Request, res: Response) => usersController.getUserById(req, res));
router.put('/v1/users/:userId', (req: Request, res: Response) => usersController.updateUser(req, res));
router.delete('/v1/users/:userId', (req: Request, res: Response) => usersController.deleteUser(req, res));
router.post('/v1/users/authenticate', (req: Request, res: Response) => usersController.authenticateUser(req, res));

/* Palindrome */

router.post('/v1/palidrome', (req: Request, res: Response) => palindromeController.create(req, res));
router.get('/v1/palidrome', (req: Request, res: Response) => palindromeController.getAll(req, res));
router.get('/v1/palidrome/latest', (req: Request, res: Response) => palindromeController.getLatest(req, res));
export default router;
