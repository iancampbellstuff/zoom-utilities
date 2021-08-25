// externals
import { Module } from 'vuex';

// store
import { IStore } from '../index';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state, { IMeetingsState } from './state';

const meetingsModule: Module<IMeetingsState, IStore> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
};

export { IMeetingsState, meetingsModule };
