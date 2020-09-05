import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import keyStorage from '../storage/keys';


export default async function loginUsingCookie(req: Request, res: Response, next: NextFunction) {
    const {token} = req.cookies;

    if (!token) {
        return next();
    }

    const keys = await keyStorage.getKeys();

    jwt.verify(token, keys.publicKey, function(err) {
        if (err) {
            res.cookie('token', '', {maxAge: 0});
            return next();
        }

        const redirectUrl = new URL(decodeURIComponent(req.query.continue));
        redirectUrl.searchParams.set('token', token);
        res.redirect(redirectUrl.href);
    });
}
