// constants
import {
    APP_PORT,
    getRequest,
    IZoomMeeting,
    IZoomMeetingPatchRequestPayload
} from '../../../common/src';
// utils
import { combineURLs, isExpired } from '../../../common/src';

export interface IMeetingFilters {
    hasPassword?: boolean;
    isNotExpired?: boolean;
}

export const LOCAL_BASE_ROUTE = `http://localhost:${APP_PORT}`;
export const getUrl = (path: string) => {
    const url = combineURLs(LOCAL_BASE_ROUTE, path);
    return url;
};
export const getMeeting = async (meetingId: string) => {
    const response = await getRequest<IZoomMeeting>({
        method: 'GET',
        url: getUrl(`meetings/${meetingId}`)
    });
    const meeting = response.data;
    return meeting;
};
export const getMeetings = async (meetingFilters: IMeetingFilters = {}) => {
    const response = await getRequest<IZoomMeeting[]>({
        method: 'GET',
        url: getUrl('meetings')
    });
    const { hasPassword, isNotExpired } = meetingFilters;
    let meetings = response.data;
    if (hasPassword) {
        meetings = meetings.filter(meeting => !!meeting.password);
    }
    if (isNotExpired) {
        meetings = meetings.filter(meeting => !isExpired(meeting.start_time));
    }
    return meetings;
};
export const updateMeeting = async (
    meetingPatchRequestPayload: IZoomMeetingPatchRequestPayload
) => {
    const response = await getRequest({
        data: meetingPatchRequestPayload.data,
        method: 'PATCH',
        url: getUrl(`meetings/${meetingPatchRequestPayload.id}`)
    });
    return response;
};
export const updateMeetings = async (
    meetingPatchRequestPayloads: IZoomMeetingPatchRequestPayload[]
) => {
    const response = await getRequest({
        data: meetingPatchRequestPayloads,
        method: 'PATCH',
        url: getUrl('meetings')
    });
    return response;
};
export const getUserIds = async () => {
    const response = await getRequest<string[]>({
        method: 'GET',
        url: getUrl('users')
    });
    const userIds = response.data;
    return userIds;
};
export const setCurrentUserId = async (userId: string) => {
    const response = await getRequest({
        method: 'POST',
        url: getUrl(`users/${userId}`)
    });
    return response;
};
