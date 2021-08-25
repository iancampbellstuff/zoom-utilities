// externals
import { MutationTree } from 'vuex';

// types
import { IMeetingsState } from './state';
import { IZoomMeeting } from '../../../../common/src';

const resetCurrentUserId = (state: IMeetingsState) => {
    delete state.currentUserId;
};

const resetMeetings = (state: IMeetingsState) => {
    delete state.meetings;
};

const resetSearch = (state: IMeetingsState) => {
    delete state.search;
};

const resetUserIds = (state: IMeetingsState) => {
    delete state.userIds;
};

const mutation: MutationTree<IMeetingsState> = {
    resetAll(state: IMeetingsState) {
        resetCurrentUserId(state);
        resetMeetings(state);
        resetSearch(state);
        resetUserIds(state);
    },
    resetCurrentUserId,
    resetMeetings,
    resetSearch,
    resetUserIds,
    setCurrentUserId(state: IMeetingsState, currentUserId: string) {
        if (currentUserId) {
            state.currentUserId = currentUserId;
        }
    },
    setMeetings(state: IMeetingsState, meetings: IZoomMeeting[]) {
        if (meetings) {
            state.meetings = meetings;
        }
    },
    setSearch(state: IMeetingsState, search: string) {
        if (search) {
            state.search = search;
        }
    },
    setUserIds(state: IMeetingsState, userIds: string[]) {
        if (userIds) {
            state.userIds = userIds;
        }
    }
};

export default mutation;
