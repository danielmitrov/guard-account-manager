import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import cors from 'cors';

import apiRouter from './routes';


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', apiRouter);

app.use(express.static('../client/dist'));
app.get('*', function(req, res) {
    res.sendFile(path.resolve('../client/dist/index.html'));
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});

export default {
    app,
    port,
};
