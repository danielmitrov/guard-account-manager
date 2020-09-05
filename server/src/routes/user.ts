import jwt from 'jsonwebtoken';
import { Router } from 'express';

import keyStorage from '../storage/keys';


const router = Router();

function isValidCredentials(credentials: {username: string, password: string}): boolean {
    const {username, password} = credentials;
    if (username === "test" && password === "password") {
        return true;
    }

    return false;
}

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    
    if (!isValidCredentials({username, password})) {
        return res.send({isValid: false});
    }

    const data = {username};
    const keys = await keyStorage.getKeys();

    const token = jwt.sign(data, keys.privateKey, {
        algorithm: 'RS256',
        keyid: await keyStorage.getKeyId(),
    });

    res.send({
        isValid: true,
        token,
    });
});

export default router;
