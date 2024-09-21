// constants
import { APP_PORT } from '../../common/src/constants';
// externals
import compression from 'compression';
import cors from 'cors';
import express from 'express';
// routes
import { getRouterMap } from './routes';

const { json, urlencoded } = express;
const getApp = () => {
    const app = express();
    app.use(compression());
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use(
        cors({
            optionsSuccessStatus: 200,
            origin: '*'
        })
    );
    return app;
};
const init = () => {
    const app = getApp();
    const routerMap = getRouterMap();
    for (const [path, router] of Object.entries(routerMap)) {
        app.use(path, router);
    }
    app.listen(APP_PORT, () => {
        console.log('Server started...');
    });
};

// start server
export default init;
init();
