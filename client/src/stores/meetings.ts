import { defineStore } from 'pinia';
import { IZoomMeeting } from '../../../common/src';

export interface IMeetingsState {
    currentUserId: string;
    meetings: IZoomMeeting[];
    search: string;
    userIds: string[];
}

export const useMeetingsStore = defineStore({
    id: 'meetings',
    state: (): IMeetingsState => ({
        currentUserId: '',
        meetings: [],
        search: '',
        userIds: []
    }),
    actions: {
        resetAll() {
            this.resetCurrentUserId();
            this.resetMeetings();
            this.resetSearch();
            this.resetUserIds();
        },
        resetCurrentUserId() {
            this.currentUserId = '';
        },
        resetMeetings() {
            this.meetings = [];
        },
        resetSearch() {
            this.search = '';
        },
        resetUserIds() {
            this.userIds = [];
        },
        setCurrentUserId(currentUserId: string) {
            this.currentUserId = currentUserId;
        },
        setMeetings(meetings: IZoomMeeting[]) {
            this.meetings = meetings;
        },
        setSearch(search: string) {
            this.search = search;
        },
        setUserIds(userIds: string[]) {
            this.userIds = userIds;
        }
    },
    getters: {
        getCurrentUserId(state) {
            return state.currentUserId;
        },
        getMeetings(state) {
            return state.meetings;
        },
        getSearch(state) {
            return state.search;
        },
        getUserIds(state) {
            return state.userIds;
        }
    }
});
