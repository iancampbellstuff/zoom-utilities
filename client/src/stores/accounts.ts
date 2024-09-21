// externals
import { defineStore } from 'pinia';
// types
import { IZoomAccountDataResponseItem } from '../../../common/src/types';

export interface IAccountsState {
    accountData: IZoomAccountDataResponseItem[];
    search: string;
}

export const useAccountsStore = defineStore({
    id: 'accounts',
    state: (): IAccountsState => ({
        accountData: [],
        search: ''
    }),
    actions: {
        resetAll() {
            this.resetAccountData();
            this.resetSearch();
        },
        resetAccountData() {
            this.accountData = [];
        },
        resetSearch() {
            this.search = '';
        },
        setAccountData(accountData: IZoomAccountDataResponseItem[]) {
            this.accountData = accountData;
        },
        setSearch(search: string) {
            this.search = search;
        }
    },
    getters: {
        getAccountData(state) {
            return state.accountData;
        },
        getSearch(state) {
            return state.search;
        }
    }
});
