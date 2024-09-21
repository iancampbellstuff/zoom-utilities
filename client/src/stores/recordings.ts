// externals
import { defineStore } from 'pinia';
// types
import { IZoomMeetingRecordingsResponseItem } from '../../../common/src/types';

export interface IRecordingsState {
    currentUserId: string;
    recordings: IZoomMeetingRecordingsResponseItem[];
    search: string;
    userIds: string[];
}

export const useRecordingsStore = defineStore({
    id: 'recordings',
    state: (): IRecordingsState => ({
        currentUserId: '',
        recordings: [],
        search: '',
        userIds: []
    }),
    actions: {
        resetAll() {
            this.resetCurrentUserId();
            this.resetRecordings();
            this.resetSearch();
            this.resetUserIds();
        },
        resetCurrentUserId() {
            this.currentUserId = '';
        },
        resetRecordings() {
            this.recordings = [];
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
        setRecordings(recordings: IZoomMeetingRecordingsResponseItem[]) {
            this.recordings = recordings;
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
        getRecordings(state) {
            return state.recordings;
        },
        getSearch(state) {
            return state.search;
        },
        getUserIds(state) {
            return state.userIds;
        }
    }
});
