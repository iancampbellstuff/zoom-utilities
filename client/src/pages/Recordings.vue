<!-- See https://codepen.io/b0otable/pen/PozWLYR for reference -->
<template>
    <q-page id="recordings" class="row items-start justify-evenly">
        <q-form id="form" class="q-gutter-lg">
            <q-toolbar-title class="text-center">Recordings</q-toolbar-title>
            <q-table
                :columns="columns"
                :filter-method="(customFilter as any)"
                :filter="filter"
                :rows="data"
                outlined
                row-key="id"
                standout
                title="Recordings"
                v-model:pagination="paginationOptions"
            >
                <template v-slot:top>
                    <div style="width: 100%" class="row">
                        <div :class="!!currentUserId ? 'col-3' : 'col-5'">
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
                        <q-td key="topic" :title="props.row.topic">{{
                            truncate(props.row.topic)
                        }}</q-td>
                        <q-td
                            key="recording_start"
                            :title="getFormattedDate(props.row.recording_start)"
                            >{{
                                truncate(
                                    getFormattedDate(
                                        props.row.recording_start
                                    ).toString()
                                )
                            }}</q-td
                        >
                        <q-td key="play_url">
                            <a
                                href="javascript:void(0);"
                                @click="
                                    () => {
                                        play = true;
                                        playUrl = props.row.play_url;
                                    }
                                "
                            >
                                {{ truncate(props.row.play_url) }}
                            </a>
                            <q-dialog v-model="play">
                                <q-card style="min-width: 350px">
                                    <q-card-section>
                                        <div class="text-h6">
                                            Copy or open this URL?
                                        </div>
                                    </q-card-section>
                                    <q-card-section
                                        class="q-pt-none bg-grey-4 scroll"
                                    >
                                        <q-input
                                            borderless
                                            readonly
                                            type="textarea"
                                            v-model="playUrl"
                                        ></q-input>
                                    </q-card-section>
                                    <q-card-actions
                                        class="text-primary justify-end"
                                    >
                                        <q-btn
                                            @click="onCopy"
                                            flat
                                            label="Copy"
                                            v-close-popup
                                        ></q-btn>
                                        <q-btn
                                            @click="onOpen"
                                            flat
                                            label="Open"
                                            v-close-popup
                                        ></q-btn>
                                        <q-btn
                                            flat
                                            label="Cancel"
                                            v-close-popup
                                        ></q-btn>
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
                        </q-td>
                        <q-td key="download_url">
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
// externals
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
// stores
import { useRecordingsStore } from '../stores';
// types
import { IZoomMeetingRecordingsResponseItem } from '@zoom-utilities/common/src/types';
// utils
import {
    copyInput,
    ELogLevel,
    getRecordings,
    getUserIds,
    toast
} from '../utils';
import { getFormattedDate, truncate } from '@zoom-utilities/common/src/utils';

interface IPaginationOptions {
    rowsPerPage: number;
}

const $q = useQuasar();
const paginationOptions = ref<IPaginationOptions>({
    rowsPerPage: 10
});
const columns: any = [
    {
        align: 'left',
        field: 'topic',
        label: 'Meeting Name',
        name: 'topic',
        required: true,
        sort: (a: string, b: string) => a.localeCompare(b),
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
const play = ref(false);
const playUrl = ref('');

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
            .catch(() => {
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
const onChangeUserId = (userId: string) => {
    currentUserId.value = userId;
    store.setCurrentUserId(userId);
    errorOccurred.value = false;
    $q.loading.show();
    getRecordings(userId)
        .then((recordings: IZoomMeetingRecordingsResponseItem[]) => {
            data.value = recordings;
            store.setRecordings(recordings);
        })
        .catch(() => {
            errorOccurred.value = true;
            showErrorMessage();
        })
        .finally(() => {
            $q.loading.hide();
        });
};
const onRefresh = () => {
    const userId = currentUserId.value;
    if (userId) {
        errorOccurred.value = false;
        $q.loading.show();
        getRecordings(userId)
            .then((recordings) => {
                data.value = recordings;
                store.setRecordings(recordings);
            })
            .catch(() => {
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
const onCopy = () => {
    if (playUrl.value) {
        const message = 'URL copied to the clipboard!';
        copyInput(playUrl.value, message).then(() => {
            playUrl.value = '';
        });
    }
};
const onOpen = () => {
    if (playUrl.value) {
        const redirectWindow = window.open(playUrl.value, '_blank');
        redirectWindow?.location;
    }
};
const showErrorMessage = () => {
    if (errorOccurred.value) {
        toast('An error occurred!', ELogLevel.ERROR);
    }
};
</script>
