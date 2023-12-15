<!-- See https://codepen.io/b0otable/pen/PozWLYR for reference -->
<template>
    <q-page id="recordings" class="row items-start justify-evenly">
        <q-form id="form" class="q-gutter-lg">
            <q-toolbar-title class="text-center">Recordings</q-toolbar-title>
            <q-table
                :columns="columns"
                :rows="data"
                :filter-method="(customFilter as any)"
                :filter="filter"
                outlined
                v-model:pagination="paginationOptions"
                row-key="name"
                standout
                title="Recordings"
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
                        <q-td
                            key="topic"
                            :props="props"
                            :title="props.row.topic"
                            >{{ truncate(props.row.topic) }}</q-td
                        >
                        <q-td
                            key="recording_start"
                            :props="props"
                            :title="getFormattedDate(props.row.recording_start)"
                            >{{
                                truncate(
                                    getFormattedDate(
                                        props.row.recording_start
                                    ).toString()
                                )
                            }}</q-td
                        >
                        <q-td key="play_url" :props="props">
                            <a :href="props.row.play_url" target="_blank">
                                {{ truncate(props.row.play_url) }}
                            </a>
                        </q-td>
                        <q-td key="download_url" :props="props">
                            <a :href="props.row.download_url" target="_blank">
                                {{ truncate(props.row.download_url) }}
                            </a>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-form>
    </q-page>
</template>

<style scoped lang="scss">
#recordings {
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
import { useRecordingsStore } from '../stores';
import {
    getFormattedDate,
    IZoomMeetingRecordingsResponseItem,
    truncate
} from '../../../common/src';
import {
    ELogLevel,
    getRecordings,
    getUserIds,
    setCurrentUserId,
    toast
} from '../utils';

interface IPaginationOptions {
    rowsPerPage: number;
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
        field: 'recording_start',
        label: 'Recording Date',
        name: 'recording_start',
        required: true,
        sort: (a: Date, b: Date) => b.getTime() - a.getTime(),
        sortable: true
    },
    {
        align: 'left',
        field: 'play_url',
        label: 'Play URL',
        name: 'play_url',
        required: true
    },
    {
        align: 'left',
        field: 'download_url',
        label: 'Download URL',
        name: 'download_url',
        required: true
    }
];
const store = useRecordingsStore();
const currentUserId = ref('');
const data = ref<IZoomMeetingRecordingsResponseItem[]>([]);
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
    data.value = store.recordings;
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
            return getRecordings();
        })
        .then((recordings) => {
            data.value = recordings;
            store.setRecordings(recordings);
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
        getRecordings()
            .then((recordings) => {
                data.value = recordings;
                store.setRecordings(recordings);
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
const onSearch = () => {
    store.setSearch(search.value);
};
const showErrorMessage = () => {
    if (errorOccurred.value) {
        toast('An error occurred!', ELogLevel.ERROR);
    }
};
</script>
