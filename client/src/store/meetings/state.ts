// types
import { IZoomMeeting } from '../../../../common/src';

export interface IMeetingsState {
    currentUserId?: string;
    meetings?: IZoomMeeting[];
    search?: string;
    userIds?: string[];
}

const state: IMeetingsState = {};

export default state;
