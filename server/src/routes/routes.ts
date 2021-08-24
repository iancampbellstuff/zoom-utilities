// externals
import { Router } from 'express';
// routes
import { getUserRoutes } from './userRoutes';
import { getMeetingRoutes } from './meetingRoutes';

export interface IRouterMap {
    [key: string]: Router;
}

export const getRouterMap = () => {
    const routerMap: IRouterMap = {
        '/users': getUserRoutes(),
        '/meetings': getMeetingRoutes()
    };
    return routerMap;
};
