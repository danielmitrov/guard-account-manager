import keyto from '@trust/keyto';
import { Router } from 'express';

import keyStorage from '../storage/keys';


const router = Router();


router.get('/', async (req, res) => {
    const keys = await keyStorage.getKeys();

    const key = keyto.from(keys.publicKey, 'pem').toJwk('public');
    key['kid'] = await keyStorage.getKeyId();

    res.send({
        keys: [key],
    });
});

export default router;
