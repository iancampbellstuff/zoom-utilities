// externals
import compression from 'compression';
import cors from 'cors';
import express from 'express';
// routes
import { getRouterMap } from './routes';

const APP_PORT = 4000;

const getApp = () => {
    const app = express();
    app.use(compression());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ origin: '*' }));
    return app;
};
const init = () => {
    const app = getApp();
    const routerMap = getRouterMap();
    for (const [path, router] of Object.entries(routerMap)) {
        app.use(path, router);
    }
    app.listen(APP_PORT, function () {
        console.log('Server started...');
    });
};

// start server
init();
