import { Router } from 'express';

import userRouter from './user';
import keysRouter from './keys';

const router = Router();

router.use('/user', userRouter);
router.use('/keys', keysRouter);


export default router;
