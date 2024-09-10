// constants
import { APP_PORT } from '@zoom-utilities/common/src/constants';
// types
import {
    IZoomAccountDataResponseItem,
    IZoomLiveMeetingsResponse,
    IZoomMeeting,
    IZoomMeetingPatchRequestPayload,
    IZoomMeetingPostRequestPayload,
    IZoomMeetingRecordingsResponseItem
} from '@zoom-utilities/common/src/types';
// utils
import {
    combineURLs,
    getRequest,
    isExpired
} from '@zoom-utilities/common/src/utils';

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
export const getLiveMeetings = async (userId: string) => {
    const response = await getRequest<IZoomLiveMeetingsResponse>({
        method: 'GET',
        params: {
            userId
        },
        url: getUrl('meetings/live')
    });
    const liveMeetings = response.data;
    return liveMeetings;
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
export const getAccountData = async () => {
    const userIds = await getUserIds();
    const accountData: IZoomAccountDataResponseItem[] = [];
    for (const userId of userIds) {
        const response = await getLiveMeetings(userId);
        const { meetings } = response;
        if (meetings.length) {
            const accountDataItems: IZoomAccountDataResponseItem[] = meetings
                .map((meeting) => {
                    const { topic } = meeting;
                    const accountDataItem: IZoomAccountDataResponseItem = {
                        account_id: userId,
                        in_meeting: true,
                        topic
                    };
                    return accountDataItem;
                })
                .sort((a, b) => {
                    if (a.topic && b.topic) {
                        return a.topic.localeCompare(b.topic);
                    } else if (a.topic) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            accountData.push(...accountDataItems);
        } else {
            const accountDataItem: IZoomAccountDataResponseItem = {
                account_id: userId,
                in_meeting: false
            };
            accountData.push(accountDataItem);
        }
    }
    return accountData;
};
