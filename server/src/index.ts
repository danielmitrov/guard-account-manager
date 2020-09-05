import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import cors from 'cors';

import keyStorage from './storage/keys';
import {generateKeyPair} from './utils/keys';

import middleware from './middleware';
import apiRouter from './routes';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/v1', apiRouter);

app.use(express.static('../client/dist'));
app.get('/login', middleware.validateApp);
app.get('/login', middleware.loginUsingCookie);
app.get('*', function(req, res) {
    res.sendFile(path.resolve('../client/dist/index.html'));
});

async function start() {
    const startKeys = await generateKeyPair();
    await keyStorage.saveKeys(startKeys);

    server.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
}

start();

export default {
    app,
    port,
};
