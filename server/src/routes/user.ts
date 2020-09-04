import jwt from 'jsonwebtoken';

import { Router } from 'express';


const router = Router();

function isValidCredentials(credentials: {username: string, password: string}): boolean {
    const {username, password} = credentials;
    if (username === "test" && password === "password") {
        return true;
    }

    return false;
}

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (!isValidCredentials({username, password})) {
        return res.send({isValid: false});
    }

    const data = {username};

    res.send({
        isValid: true,
        token: jwt.sign(data, 'MYSUPERDUPERSECRET'),
    });
});

export default router;
