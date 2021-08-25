// externals
import { GetterTree } from 'vuex';

// types
import { IMeetingsState } from './state';
import { IStore } from '../index';

const getters: GetterTree<IMeetingsState, IStore> = {
    getCurrentUserId(state: IMeetingsState) {
        return state.currentUserId;
    },
    getMeetings(state: IMeetingsState) {
        return state.meetings;
    },
    getSearch(state: IMeetingsState) {
        return state.search;
    },
    getUserIds(state: IMeetingsState) {
        return state.userIds;
    }
};

export default getters;
