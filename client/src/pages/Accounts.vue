<template>
    <q-page id="accounts" class="row items-start justify-evenly">
        <q-form id="form" class="q-gutter-lg">
            <q-toolbar-title class="text-center">Accounts</q-toolbar-title>
            <q-table
                :columns="columns"
                :filter-method="(customFilter as any)"
                :filter="filter"
                :rows="data"
                outlined
                row-key="account_id"
                standout
                title="Accounts"
                v-model:pagination="paginationOptions"
            >
                <template v-slot:top>
                    <div style="width: 100%" class="row justify-between">
                        <div class="col-2">
                            <q-btn
                                @click="onRefresh"
                                color="secondary"
                                :disable="!data.length"
                                flat
                                icon="refresh"
                                id="refresh-button"
                                label="Refresh"
                                no-caps
                                wait-for-ripple
                            />
                        </div>
                        <div class="col-10">
                            <q-input
                                color="primary"
                                debounce="100"
                                v-model="search"
                                @keyup="onSearch"
                            >
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="in_meeting" :title="props.row.in_meeting">
                            <q-icon
                                v-if="props.row.in_meeting"
                                class="status-icon"
                                color="secondary"
                                name="check"
                            />
                            <q-icon
                                v-if="!props.row.in_meeting"
                                class="status-icon"
                                color="accent"
                                name="close"
                            />
                        </q-td>
                        <q-td key="account_id" :title="props.row.account_id">{{
                            truncate(props.row.account_id)
                        }}</q-td>
                        <q-td key="topic" :title="props.row.topic">{{
                            truncate(props.row.topic)
                        }}</q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-form>
    </q-page>
</template>

<style scoped lang="scss">
#accounts {
    #form {
        .q-toolbar__title {
            padding: 15px;
        }
        .q-table__container {
            width: 100%;
            .q-table__top {
                label {
                    overflow: hidden;
                }
            }
        }
        #refresh-button {
            margin-top: 8px;
            padding: 0;
        }
        .status-icon {
            width: 100%;
        }
    }
}
</style>

<script setup lang="ts">
// externals
import { useQuasar } from 'quasar';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
// stores
import { useAccountsStore } from '../stores';
// types
import { IZoomAccountDataResponseItem } from '../../../common/src/types';
// utils
import { ELogLevel, getAccountData, toast } from '../utils';
import { truncate } from '../../../common/src/utils';

interface IPaginationOptions {
    rowsPerPage: number;
}

const $q = useQuasar();
const paginationOptions = ref<IPaginationOptions>({
    rowsPerPage: 10
});
const columns: any = [
    {
        align: 'center',
        field: 'in_meeting',
        label: 'Active Status',
        name: 'in_meeting',
        required: true,
        sort: (a: boolean, b: boolean) => {
            if (a === b) {
                return 0;
            } else if (a > b) {
                return -1;
            } else {
                return 1;
            }
        },
        sortable: true
    },
    {
        align: 'left',
        field: 'account_id',
        label: 'Account Name',
        name: 'account_id',
        required: true,
        sort: (a: string, b: string) => a.localeCompare(b),
        sortable: true
    },
    {
        align: 'left',
        field: 'topic',
        label: 'Active Meeting',
        name: 'topic',
        required: false,
        sort: (a?: string, b?: string) => {
            if (a && b) {
                return a.localeCompare(b);
            } else if (a) {
                return 1;
            } else {
                return -1;
            }
        },
        sortable: true
    }
];
const store = useAccountsStore();
const data = ref<IZoomAccountDataResponseItem[]>([]);
const errorOccurred = ref(false);
const search = ref('');
const filter = computed(() => {
    return search.value;
});
const customFilter = (rows: any[], searchValue: string) => {
    const filteredRows = rows.filter(
        (row: { [s: string]: unknown } | ArrayLike<unknown>) => {
            let resultFound = true;
            if (searchValue !== '') {
                const rowValues = Object.entries(row).reduce(
                    (values: string[], [key, value]) => {
                        switch (key) {
                            case 'account_id':
                            case 'topic': {
                                values.push((value as any).toString());
                                break;
                            }
                        }
                        return values;
                    },
                    []
                );
                resultFound = false;
                for (let i = 0; i < rowValues.length; i++) {
                    const rowValue = rowValues[i];
                    if (rowValue.includes(searchValue)) {
                        resultFound = true;
                        break;
                    }
                }
            }
            return resultFound;
        }
    );
    return filteredRows;
};
const showErrorMessage = () => {
    if (errorOccurred.value) {
        toast('An error occurred!', ELogLevel.ERROR);
    }
};
const onRefresh = () => {
    errorOccurred.value = false;
    $q.loading.show();
    getAccountData()
        .then((accountData: IZoomAccountDataResponseItem[]) => {
            data.value = accountData;
            store.setAccountData(accountData);
        })
        .catch(() => {
            errorOccurred.value = true;
            showErrorMessage();
        })
        .finally(() => {
            $q.loading.hide();
        });
};
const onSearch = () => {
    store.setSearch(search.value);
};

onBeforeMount(() => {
    data.value = store.accountData;
    if (!data.value?.length) {
        onRefresh();
    }
});
onMounted(() => {
    search.value = store.search;
});
</script>
