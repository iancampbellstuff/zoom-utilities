import { Module } from 'vuex';
import { IStore } from '../index';
import state, { IPasscodeState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const passcodeModule: Module<IPasscodeState, IStore> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
};

export { IPasscodeState, passcodeModule };
