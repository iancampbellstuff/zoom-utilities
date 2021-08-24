<!-- See https://codepen.io/b0otable/pen/PozWLYR for reference -->
<template>
    <q-page id="meetings" class="row items-start justify-evenly">
        <q-form id="form" class="q-gutter-lg">
            <q-toolbar-title class="text-center">Meetings</q-toolbar-title>
            <q-table
                :columns="columns"
                :data="data"
                :filter-method="customFilter"
                :filter="filter"
                outlined
                :pagination.sync="paginationOptions"
                row-key="name"
                standout
                title="Meetings"
            >
                <template v-slot:top>
                    <div style="width: 100%" class="row">
                        <div class="col-3">
                            <q-select
                                :options="userIds"
                                @input="onChangeUserId"
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
                                    (value, initialValue) =>
                                        onSavePopup(value, initialValue, props)
                                "
                                v-model="props.row.topic"
                            >
                                <q-input
                                    autofocus
                                    counter
                                    dense
                                    v-model="props.row.topic"
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
                                    (value, initialValue) =>
                                        onSavePopup(value, initialValue, props)
                                "
                                v-model="props.row.password"
                            >
                                <q-input
                                    autofocus
                                    counter
                                    dense
                                    v-model="props.row.password"
                                />
                            </q-popup-edit>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-form>
    </q-page>
</template>

<style lang="scss" scoped>
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

<script lang="ts">
// externals
import Vue from 'vue';
// types
import { IZoomMeeting } from '../../../common/src';
// utils
import { mapToPatchRequestPayload } from '../../../common/src';
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
interface IData {
    columns: any[];
    currentUserId: string;
    data: IZoomMeeting[];
    errorOccurred: boolean;
    paginationOptions: IPaginationOptions;
    search: string;
    userIds: string[];
}
interface IZoomMeetingRowProps {
    key: keyof IZoomMeeting;
    row: IZoomMeeting;
    rowIndex: number;
}
export default Vue.extend({
    name: 'Meetings',
    beforeMount() {
        this.errorOccurred = false;
        this.$q.loading.show();
        getUserIds()
            .then((userIds: string[]) => {
                this.userIds = userIds;
            })
            .catch(error => {
                this.errorOccurred = true;
                this.showErrorMessage();
            })
            .finally(() => {
                this.$q.loading.hide();
            });
    },
    data(): IData {
        return {
            columns: [
                {
                    align: 'left',
                    field: 'topic',
                    label: 'Meeting Name',
                    name: 'topic',
                    required: true,
                    sort: (a: string, b: string) =>
                        parseInt(a, 10) - parseInt(b, 10),
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
                    format: (value: string | undefined) => value || '',
                    label: 'Passcode',
                    name: 'password',
                    required: false
                }
            ],
            currentUserId: '',
            data: [],
            errorOccurred: false,
            paginationOptions: {
                rowsPerPage: 10
            },
            search: '',
            userIds: []
        };
    },
    computed: {
        filter(): { search: string } {
            return {
                search: this.search
            };
        }
    },
    methods: {
        customFilter(rows: any[], terms: { search: string }) {
            const searchValue = terms.search?.trim() || '';
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
        },
        showErrorMessage() {
            if (this.errorOccurred) {
                toast('An error occurred!', ELogLevel.ERROR);
            }
        },
        onChangeUserId() {
            this.errorOccurred = false;
            this.$q.loading.show();
            setCurrentUserId(this.currentUserId)
                .then(() => {
                    return getMeetings({
                        hasPassword: true,
                        isNotExpired: true
                    });
                })
                .then(meetings => {
                    this.data = meetings;
                })
                .catch(error => {
                    this.errorOccurred = true;
                    this.showErrorMessage();
                })
                .finally(() => {
                    this.$q.loading.hide();
                });
        },
        onRefresh() {
            if (this.currentUserId) {
                this.errorOccurred = false;
                this.$q.loading.show();
                getMeetings({
                    hasPassword: true,
                    isNotExpired: true
                })
                    .then(meetings => {
                        this.data = meetings;
                    })
                    .catch(error => {
                        this.errorOccurred = true;
                        this.showErrorMessage();
                    })
                    .finally(() => {
                        this.$q.loading.hide();
                    });
            }
        },
        onSavePopup(
            value: string,
            initialValue: string,
            rowProps: IZoomMeetingRowProps
        ) {
            const { key, row, rowIndex } = rowProps;
            (row as any)[key] = value;
            const patchRequestPayload = mapToPatchRequestPayload(row);
            this.errorOccurred = false;
            this.$q.loading.show();
            updateMeeting(patchRequestPayload)
                .then(() => {
                    toast('Data saved successfully.');
                })
                .catch(error => {
                    this.errorOccurred = true;
                    this.showErrorMessage();
                })
                .finally(() => {
                    this.$q.loading.hide();
                });
        }
    }
});
</script>
