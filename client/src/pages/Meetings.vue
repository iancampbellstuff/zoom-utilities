<!-- See https://codepen.io/b0otable/pen/PozWLYR for reference -->
<template>
    <q-page id="meetings" class="row items-start justify-evenly">
        <q-form id="form" class="q-gutter-lg">
            <q-toolbar-title class="text-center">Meetings</q-toolbar-title>
            <q-table
                :columns="columns"
                :filter-method="(customFilter as any)"
                :filter="filter"
                :rows="data"
                :selected-rows-label="getSelectedString"
                @update:pagination="onPagination"
                outlined
                row-key="id"
                selection="multiple"
                standout
                title="Meetings"
                v-model:pagination="paginationOptions"
                v-model:selected="selectedRows"
            >
                <template v-slot:top>
                    <div style="width: 100%" class="row justify-between">
                        <div class="col">
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
                        <q-btn
                            @click="copy = true"
                            color="secondary"
                            :disable="
                                !currentUserId || selectedRows.length !== 1
                            "
                            flat
                            icon="file_copy"
                            label="Copy"
                            no-caps
                            wait-for-ripple
                        />
                        <q-dialog
                            v-model="copy"
                            @before-show="() => setCopyInput(copyToggle)"
                        >
                            <q-card style="min-width: 350px">
                                <q-card-section>
                                    <div class="text-h6">
                                        Copy {{ !copyToggle ? 'text' : 'HTML' }}
                                    </div>
                                </q-card-section>
                                <q-card-section
                                    class="q-pt-none bg-grey-4 scroll"
                                >
                                    <q-input
                                        borderless
                                        readonly
                                        type="textarea"
                                        v-model="copyTextarea"
                                    ></q-input>
                                </q-card-section>
                                <q-card-actions
                                    class="text-primary justify-around"
                                >
                                    <div>
                                        <span>text</span>
                                        <q-toggle
                                            @update:model-value="setCopyInput"
                                            v-model="copyToggle"
                                        />
                                        <span>HTML</span>
                                    </div>
                                    <div>
                                        <q-btn
                                            @click="onCopyInput"
                                            flat
                                            label="Copy"
                                            v-close-popup
                                        ></q-btn>
                                        <q-btn
                                            flat
                                            label="Cancel"
                                            v-close-popup
                                        ></q-btn>
                                    </div>
                                </q-card-actions>
                            </q-card>
                        </q-dialog>
                        <q-btn
                            @click="update = true"
                            color="secondary"
                            :disable="!currentUserId || !selectedRows.length"
                            flat
                            icon="update"
                            label="Update"
                            no-caps
                            wait-for-ripple
                        />
                        <q-dialog v-model="update">
                            <q-card style="min-width: 350px">
                                <q-card-section>
                                    <div class="text-h6">
                                        Update passcode for
                                        {{ selectedRows.length }} row(s):
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-pt-none">
                                    <q-input
                                        autofocus
                                        color="primary"
                                        label="Passcode:"
                                        v-model="updatePasscode"
                                    ></q-input>
                                </q-card-section>
                                <q-card-actions
                                    class="text-primary justify-end"
                                >
                                    <q-btn
                                        @click="onUpdate"
                                        flat
                                        label="Update"
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
                        <q-btn
                            @click="del = true"
                            color="secondary"
                            :disable="!currentUserId || !selectedRows.length"
                            flat
                            icon="delete"
                            label="Delete"
                            no-caps
                            wait-for-ripple
                        />
                        <q-dialog v-model="del">
                            <q-card style="min-width: 350px">
                                <q-card-section>
                                    <div class="text-h6">
                                        Are you sure you want to delete
                                        {{ selectedRows.length }} row(s)?
                                    </div>
                                </q-card-section>
                                <q-card-actions
                                    class="text-primary justify-end"
                                >
                                    <q-btn
                                        @click="onDelete"
                                        flat
                                        label="Delete"
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
                        <q-btn
                            @click="create = true"
                            color="secondary"
                            :disable="!currentUserId || !!selectedRows.length"
                            flat
                            icon="create"
                            label="New"
                            no-caps
                            wait-for-ripple
                        />
                        <q-dialog v-model="create">
                            <q-card style="min-width: 350px">
                                <q-card-section>
                                    <div class="text-h6">
                                        Create a new meeting:
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-pt-none">
                                    <q-input
                                        autofocus
                                        color="primary"
                                        label="Meeting Name:"
                                        v-model="createMeetingName"
                                    ></q-input>
                                </q-card-section>
                                <q-card-section class="q-pt-none">
                                    <q-input
                                        color="primary"
                                        label="Passcode (optional):"
                                        maxlength="10"
                                        v-model="createPasscode"
                                    ></q-input>
                                </q-card-section>
                                <q-card-section class="q-pt-none">
                                    <span class="text-h7"
                                        >Record to the cloud?</span
                                    >
                                    <q-checkbox
                                        v-model="createRecordToTheCloud"
                                    />
                                </q-card-section>
                                <q-card-actions
                                    class="text-primary justify-end"
                                >
                                    <q-btn
                                        @click="onCreate"
                                        flat
                                        label="Create"
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
                    </div>
                    <div style="width: 100%" class="row">
                        <div class="col-12">
                            <q-input
                                autofocus
                                color="primary"
                                debounce="100"
                                label="Search:"
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
                        <q-td>
                            <q-checkbox v-model="props.selected" />
                        </q-td>
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                            row-key="id"
                        >
                            <span v-if="col.name === 'topic'">
                                {{ props.row.topic }}
                                <q-popup-edit
                                    buttons
                                    persistent
                                    @save="
                                    (value: string, initialValue: string) =>
                                        onSaveMeetingName(value, initialValue, props)
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
                            </span>
                            <span v-else-if="col.name === 'id'">
                                {{ getFormattedMeetingId(props.row.id) }}
                            </span>
                            <span v-else-if="col.name === 'password'">
                                {{ props.row.password }}
                                <q-popup-edit
                                    buttons
                                    persistent
                                    @save="
                                    (value: string, initialValue: string) =>
                                        onSavePasscode(value, initialValue, props)
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
                            </span>
                            <span v-else-if="col.name === 'recordToTheCloud'">
                                <q-checkbox
                                    @update:model-value="(value: boolean) => onSaveRecordToTheCloud(value, props)"
                                    :modelValue="
                                        props.row.settings?.auto_recording ===
                                        'cloud'
                                    "
                                />
                            </span>
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
// externals
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
// stores
import { useMeetingsStore } from '../stores';
// types
import {
    IZoomMeeting,
    IZoomMeetingPatch,
    IZoomMeetingPatchRequestPayload
} from '../../../common/src/types';
// utils
import {
    copyInput,
    createMeeting,
    deleteMeetings,
    ELogLevel,
    getMeetings,
    getUserIds,
    toast,
    updateMeeting,
    updateMeetings
} from '../utils';
import {
    getFormattedMeetingId,
    mapToPatchRequestPayload,
    mapToPostRequestPayload
} from '../../../common/src/utils';

interface IPaginationOptions {
    rowsPerPage: number;
}
interface IZoomMeetingRowProps {
    key: keyof IZoomMeeting;
    row: IZoomMeeting;
    rowIndex: number;
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
    },
    {
        align: 'center',
        label: 'Record to the Cloud?',
        name: 'recordToTheCloud',
        required: false
    }
];
const store = useMeetingsStore();
const currentUserId = ref('');
const data = ref<IZoomMeeting[]>([]);
const selectedRows = ref<IZoomMeeting[]>([]);
const errorOccurred = ref(false);
const search = ref('');
const userIds = ref<string[]>([]);
const copy = ref(false);
const update = ref(false);
const del = ref(false);
const create = ref(false);
const copyToggle = ref(true);
const copyTextarea = ref('');
const updatePasscode = ref('');
const createMeetingName = ref('');
const createPasscode = ref('');
const createRecordToTheCloud = ref(false);

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
const onChangeUserId = (userId: string) => {
    currentUserId.value = userId;
    store.setCurrentUserId(userId);
    errorOccurred.value = false;
    $q.loading.show();
    getMeetings(
        {
            isNotExpired: true
        },
        userId
    )
        .then((meetings) => {
            data.value = meetings;
            store.setMeetings(meetings);
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
        selectedRows.value = [];
        $q.loading.show();
        getMeetings(
            {
                isNotExpired: true
            },
            userId
        )
            .then((meetings) => {
                data.value = meetings;
                store.setMeetings(meetings);
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
const onSave = (patchRequestPayload: IZoomMeetingPatchRequestPayload) => {
    const userId = currentUserId.value;
    errorOccurred.value = false;
    $q.loading.show();
    updateMeeting(patchRequestPayload, userId)
        .then(() => {
            toast('Meeting updated successfully.');
        })
        .catch(() => {
            errorOccurred.value = true;
            showErrorMessage();
        })
        .finally(() => {
            $q.loading.hide();
        });
};
const onSaveMeetingName = (
    meetingName: string,
    initialValue: string,
    rowProps: IZoomMeetingRowProps
) => {
    const { row } = rowProps;
    const patchRequestPayload = mapToPatchRequestPayload(row);
    patchRequestPayload.data.agenda = meetingName;
    patchRequestPayload.data.topic = meetingName;
    onSave(patchRequestPayload);
};
const onSavePasscode = (
    passcode: string,
    initialValue: string,
    rowProps: IZoomMeetingRowProps
) => {
    const { row } = rowProps;
    const patchRequestPayload = mapToPatchRequestPayload(row);
    patchRequestPayload.data.password = passcode;
    onSave(patchRequestPayload);
};
const onSaveRecordToTheCloud = (
    recordingToTheCloud: boolean,
    rowProps: IZoomMeetingRowProps
) => {
    const setAutoRecording = (data: IZoomMeeting | IZoomMeetingPatch) => {
        data.settings = {
            ...data.settings,
            auto_recording: recordingToTheCloud ? 'cloud' : 'none'
        };
    };
    const { row } = rowProps;
    const patchRequestPayload = mapToPatchRequestPayload(row);
    setAutoRecording(row);
    setAutoRecording(patchRequestPayload.data);
    onSave(patchRequestPayload);
};
const onSearch = () => {
    store.setSearch(search.value);
};
const getSelectedString = () => {
    const { length } = selectedRows.value;
    let selectedString = '';
    if (length > 0) {
        selectedString = `${length} record(s) selected of ${data.value.length}`;
    }
    return selectedString;
};
const showErrorMessage = () => {
    if (errorOccurred.value) {
        toast('An error occurred!', ELogLevel.ERROR);
    }
};
const setCopyInput = (copyHtml: boolean = copyToggle.value) => {
    const selectedRow = selectedRows.value?.[0];
    if (selectedRow) {
        const {
            host_email: hostEmail,
            id: meetingId,
            password: passcode
        } = selectedRow;
        const formattedMeetingId = getFormattedMeetingId(meetingId);
        let copyValue = '';
        if (!copyHtml) {
            // text
            copyValue = `
${hostEmail} is inviting you to a scheduled Zoom meeting.

https://us02web.zoom.us/j/${meetingId}

Meeting ID: ${formattedMeetingId}
`;
            if (passcode) {
                copyValue = `${copyValue}
Passcode: ${passcode}
`;
            }
        } else {
            // HTML
            copyValue = `<div>&nbsp;</div>
<div>${hostEmail} is inviting you to a scheduled Zoom meeting.</div>
<div>&nbsp;</div>
<div>
    <a href="https://us02web.zoom.us/j/${meetingId}" target="_blank">
        https://us02web.zoom.us/j/${meetingId}
    </a>
</div>
<div>&nbsp;</div>
<div>Meeting ID: ${formattedMeetingId}</div>`;
            if (passcode) {
                copyValue = `${copyValue}
<div>Passcode: ${passcode}</div>`;
            }
            copyValue = `${copyValue}
<div>&nbsp;</div>`;
        }
        copyTextarea.value = copyValue;
    }
};
const onCopyInput = () => {
    if (copyTextarea.value) {
        const message = `${
            !copyToggle.value ? 'Text' : 'HTML'
        } copied to the clipboard!`;
        copyInput(copyTextarea.value, message).then(() => {
            copyTextarea.value = '';
            selectedRows.value = [];
        });
    }
};
const onUpdate = () => {
    updatePasscode.value = updatePasscode.value?.trim();
    if (updatePasscode.value) {
        const userId = currentUserId.value;
        const patchRequestPayloads = (selectedRows.value as IZoomMeeting[]).map(
            (selectedRow: IZoomMeeting) => {
                const patchRequestPayload =
                    mapToPatchRequestPayload(selectedRow);
                patchRequestPayload.data.password = updatePasscode.value;
                return patchRequestPayload;
            }
        );
        errorOccurred.value = false;
        $q.loading.show();
        updateMeetings(patchRequestPayloads, userId)
            .then(() => {
                const meetingsRequest = getMeetings(
                    {
                        isNotExpired: true
                    },
                    userId
                );
                return meetingsRequest;
            })
            .then((meetings) => {
                data.value = meetings;
                store.setMeetings(meetings);
                updatePasscode.value = '';
                selectedRows.value = [];
                toast('Meeting(s) updated successfully.');
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
const onDelete = () => {
    const userId = currentUserId.value;
    const deleteRequestPayloads = (selectedRows.value as IZoomMeeting[]).map(
        (selectedRow: IZoomMeeting) => {
            const deleteRequestPayload = mapToPatchRequestPayload(selectedRow);
            return deleteRequestPayload;
        }
    );
    errorOccurred.value = false;
    $q.loading.show();
    deleteMeetings(deleteRequestPayloads, userId)
        .then(() => {
            const meetingsRequest = getMeetings(
                {
                    isNotExpired: true
                },
                userId
            );
            return meetingsRequest;
        })
        .then((meetings) => {
            data.value = meetings;
            store.setMeetings(meetings);
            selectedRows.value = [];
            toast('Meeting(s) deleted successfully.');
        })
        .catch(() => {
            errorOccurred.value = true;
            showErrorMessage();
        })
        .finally(() => {
            $q.loading.hide();
        });
};
const onCreate = () => {
    const userId = currentUserId.value;
    createMeetingName.value = createMeetingName.value?.trim();
    createPasscode.value = createPasscode.value?.trim() || '';
    if (createMeetingName.value) {
        const postRequestPayload = mapToPostRequestPayload({
            topic: createMeetingName.value,
            password: createPasscode.value,
            recordToTheCloud: createRecordToTheCloud.value,
            userId
        });
        createMeeting(postRequestPayload, userId)
            .then(() => {
                const meetingsRequest = getMeetings(
                    {
                        isNotExpired: true
                    },
                    userId
                );
                return meetingsRequest;
            })
            .then((meetings) => {
                data.value = meetings;
                store.setMeetings(meetings);
                createMeetingName.value = '';
                createPasscode.value = '';
                createRecordToTheCloud.value = false;
                toast('Meeting created successfully.');
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
const onPagination = () => {
    selectedRows.value = [];
};
</script>
