// constants
import {
    APP_PORT,
    getRequest,
    IZoomMeeting,
    IZoomMeetingPatchRequestPayload,
    IZoomMeetingPostRequestPayload,
    IZoomMeetingRecordingsResponseItem
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
export const getMeeting = async (meetingId: string, userId: string) => {
    const response = await getRequest<IZoomMeeting>({
        method: 'GET',
        params: {
            userId
        },
        url: getUrl(`meetings/${meetingId}`)
    });
    const meeting = response.data;
    return meeting;
};
export const getMeetings = async (
    meetingFilters: IMeetingFilters = {},
    userId: string
) => {
    const response = await getRequest<IZoomMeeting[]>({
        method: 'GET',
        params: {
            userId
        },
        url: getUrl('meetings')
    });
    const { hasPassword, isNotExpired } = meetingFilters;
    let meetings = response.data;
    if (hasPassword) {
        meetings = meetings.filter(
            (meeting: IZoomMeeting) => !!meeting.password
        );
    }
    if (isNotExpired) {
        meetings = meetings.filter(
            (meeting: IZoomMeeting) => !isExpired(meeting.start_time)
        );
    }
    return meetings;
};
export const createMeeting = async (
    meetingPostRequestPayload: IZoomMeetingPostRequestPayload,
    userId: string
) => {
    const response = await getRequest({
        data: meetingPostRequestPayload.data,
        method: 'POST',
        params: {
            userId
        },
        url: getUrl(`users/${meetingPostRequestPayload.userId}/meetings`)
    });
    return response;
};
export const updateMeeting = async (
    meetingPatchRequestPayload: IZoomMeetingPatchRequestPayload,
    userId: string
) => {
    const response = await getRequest({
        data: meetingPatchRequestPayload.data,
        method: 'PATCH',
        params: {
            userId
        },
        url: getUrl(`meetings/${meetingPatchRequestPayload.id}`)
    });
    return response;
};
export const updateMeetings = async (
    meetingPatchRequestPayloads: IZoomMeetingPatchRequestPayload[],
    userId: string
) => {
    const response = await getRequest({
        data: meetingPatchRequestPayloads,
        method: 'PATCH',
        params: {
            userId
        },
        url: getUrl('meetings')
    });
    return response;
};
export const deleteMeeting = async (
    meetingPatchRequestPayload: IZoomMeetingPatchRequestPayload
) => {
    const response = await getRequest({
        data: meetingPatchRequestPayload.data,
        method: 'DELETE',
        url: getUrl(`meetings/${meetingPatchRequestPayload.id}`)
    });
    return response;
};
export const deleteMeetings = async (
    meetingPatchRequestPayloads: IZoomMeetingPatchRequestPayload[],
    userId: string
) => {
    const response = await getRequest({
        data: meetingPatchRequestPayloads,
        method: 'DELETE',
        params: {
            userId
        },
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
export const getRecordings = async (userId: string) => {
    const response = await getRequest<IZoomMeetingRecordingsResponseItem[]>({
        method: 'GET',
        params: {
            userId
        },
        url: getUrl('recordings')
    });
    const recordings = response.data.filter(
        (recording: IZoomMeetingRecordingsResponseItem) =>
            !!recording.recording_end
    );
    return recordings;
};
