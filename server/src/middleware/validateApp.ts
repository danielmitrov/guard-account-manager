import {Request, Response, NextFunction} from 'express';

import appStorage from '../storage/apps';
import {AppNotFoundError, MissingDataError} from '../errors';


export default async function validateApp(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.query.continue) {
            throw new MissingDataError('Missing continue param');
        }

        const app = await appStorage.getAppByName(req.query.appName);
        const redirectUrl = new URL(req.query.continue);

        if (redirectUrl.hostname !== app.appDomain) {
            return res.status(400).send({
                error: 'Invalid redirect url',
            });
        }

        next();
    } catch (e) {
        if (e instanceof AppNotFoundError) {
            return res.status(404).send({error: e.message});
        } else if (e instanceof MissingDataError) {
            return res.status(400).send({error: e.message});
        } else if (e.code === 'ERR_INVALID_URL') {
            return res.status(400).send({error: 'bad redirect url'});
        }
        throw e;
    }
}