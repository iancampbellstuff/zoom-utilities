// externals
import { Router } from 'express';
// routes
import { getMeetingRoutes } from './meetingRoutes';
import { getRecordingRoutes } from './recordingRoutes';
import { getUserRoutes } from './userRoutes';

export interface IRouterMap {
    [key: string]: Router;
}

export const getRouterMap = () => {
    const routerMap: IRouterMap = {
        '/meetings': getMeetingRoutes(),
        '/recordings': getRecordingRoutes(),
        '/users': getUserRoutes()
    };
    return routerMap;
};
