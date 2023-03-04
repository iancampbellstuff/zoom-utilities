<!-- See https://codepen.io/b0otable/pen/PozWLYR for reference -->
<template>
    <q-page id="meetings" class="row items-start justify-evenly">
        <q-form id="form" class="q-gutter-lg">
            <q-toolbar-title class="text-center">Meetings</q-toolbar-title>
            <q-table
                :columns="columns"
                :rows="data"
                :filter-method="(customFilter as any)"
                :filter="filter"
                outlined
                v-model:pagination="paginationOptions"
                row-key="name"
                standout
                title="Meetings"
            >
                <template v-slot:top>
                    <div style="width: 100%" class="row">
                        <div class="col-3">
                            <q-select
                                :options="userIds"
                                @update:model-value="onChangeUserId"
                                fill-input
                                label="Select an Account:"
                                v-model="currentUserId"
                            />
                        </div>
                        <q-btn
                            @click="onRefresh"
                            color="secondary"
                            :disable="!currentUserId"
                            flat
                            icon="refresh"
                            label="Refresh"
                            no-caps
                            wait-for-ripple
                        />
                    </div>
                    <div style="width: 100%" class="row">
                        <div class="col-12">
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
                        <q-td key="topic" :props="props">
                            {{ props.row.topic }}
                            <q-popup-edit
                                buttons
                                persistent
                                @save="
                                    (value: string, initialValue: string) =>
                                        onSavePopup(value, initialValue, props)
                                "
                                v-slot="scope"
                                v-model="props.row.topic"
                            >
                                <q-input
                                    autofocus
                                    counter
                                    dense
                                    v-model="scope.value"
                                />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                        <q-td key="password" :props="props">
                            {{ props.row.password }}
                            <q-popup-edit
                                buttons
                                persistent
                                @save="
                                    (value: string, initialValue: string) =>
                                        onSavePopup(value, initialValue, props)
                                "
                                v-slot="scope"
                                v-model="props.row.password"
                            >
                                <q-input
                                    autofocus
                                    counter
                                    dense
                                    v-model="scope.value"
                                />
                            </q-popup-edit>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-form>
    </q-page>
</template>

<style scoped lang="scss">
#meetings {
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
    }
}
</style>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useMeetingsStore } from '../stores';
import { IZoomMeeting, mapToPatchRequestPayload } from '../../../common/src';
import {
    ELogLevel,
    getMeetings,
    getUserIds,
    setCurrentUserId,
    toast,
    updateMeeting
} from '../utils';

interface IPaginationOptions {
    rowsPerPage: number;
}
interface IZoomMeetingRowProps {
    key: keyof IZoomMeeting;
    row: IZoomMeeting;
    rowIndex: number;
}

const $q = useQuasar();
const paginationOptions: IPaginationOptions = {
    rowsPerPage: 10
};
const columns: any = [
    {
        align: 'left',
        field: 'topic',
        label: 'Meeting Name',
        name: 'topic',
        required: true,
        sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
        sortable: true
    },
    {
        align: 'left',
        field: 'id',
        label: 'Meeting ID',
        name: 'id',
        required: true
    },
    {
        align: 'left',
        field: 'password',
        format: (value: string) => value || '',
        label: 'Passcode',
        name: 'password',
        required: false
    }
];
const store = useMeetingsStore();
const currentUserId = ref('');
const data = ref<IZoomMeeting[]>([]);
const errorOccurred = ref(false);
const search = ref('');
const userIds = ref<string[]>([]);

onBeforeMount(() => {
    userIds.value = store.userIds;
    if (!userIds.value?.length) {
        errorOccurred.value = false;
        $q.loading.show();
        getUserIds()
            .then((ids: string[]) => {
                userIds.value = ids;
                store.setUserIds(userIds.value);
            })
            .catch((error) => {
                errorOccurred.value = true;
                showErrorMessage();
            })
            .finally(() => {
                $q.loading.hide();
            });
    }
});

onMounted(() => {
    currentUserId.value = store.currentUserId;
    data.value = store.meetings;
    search.value = store.search;
});
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
                            // case 'id':
                            // case 'password':
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
const onChangeUserId = (currentUserId: string) => {
    errorOccurred.value = false;
    $q.loading.show();
    setCurrentUserId(currentUserId)
        .then(() => {
            store.setCurrentUserId(currentUserId);
            return getMeetings({
                hasPassword: true,
                isNotExpired: true
            });
        })
        .then((meetings) => {
            data.value = meetings;
            store.setMeetings(meetings);
        })
        .catch((error) => {
            errorOccurred.value = true;
            showErrorMessage();
        })
        .finally(() => {
            $q.loading.hide();
        });
};
const onRefresh = () => {
    if (currentUserId.value) {
        errorOccurred.value = false;
        $q.loading.show();
        getMeetings({
            hasPassword: true,
            isNotExpired: true
        })
            .then((meetings) => {
                data.value = meetings;
                store.setMeetings(meetings);
            })
            .catch((error) => {
                errorOccurred.value = true;
                showErrorMessage();
            })
            .finally(() => {
                $q.loading.hide();
            });
    }
};
const onSavePopup = (
    value: string,
    initialValue: string,
    rowProps: IZoomMeetingRowProps
) => {
    const { row } = rowProps;
    const patchRequestPayload = mapToPatchRequestPayload(row);
    patchRequestPayload.data.password = value;
    console.log(patchRequestPayload);
    errorOccurred.value = false;
    $q.loading.show();
    updateMeeting(patchRequestPayload)
        .then(() => {
            toast('Data saved successfully.');
        })
        .catch((error) => {
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
const showErrorMessage = () => {
    if (errorOccurred.value) {
        toast('An error occurred!', ELogLevel.ERROR);
    }
};
</script>
