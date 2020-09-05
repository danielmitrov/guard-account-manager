import jwt from 'jsonwebtoken';
import { Router } from 'express';

import keyStorage from '../storage/keys';
import usersStorage from '../storage/users';
import {UserNotFoundError} from '../errors';


const router = Router();

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    
    try {
        const isValid = await usersStorage.validateCredentials(username, password);
        if (!isValid) {
            return res.send({isValid: false});
        }

        const data = {username};
        const keys = await keyStorage.getKeys();

        const token = jwt.sign(data, keys.privateKey, {
            algorithm: 'RS256',
            keyid: await keyStorage.getKeyId(),
        });

        res.cookie('token', token, {httpOnly: true});
        res.send({isValid: true, token});
    } catch (e) {
        if (e instanceof UserNotFoundError) {
            // We don't want to send an 404 so the user won't know if
            // there is such user or not.
            return res.send({isValid: false});
        }

        throw e;
    }
});

export default router;
