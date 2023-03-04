<template>
    <q-page id="passcode" class="row items-start justify-evenly">
        <q-form
            id="form"
            class="q-gutter-lg"
            @change="onChange"
            @submit="onSubmit"
            @reset="onReset"
            greedy
        >
            <q-toolbar-title class="text-center"
                >Generate a Passcode</q-toolbar-title
            >
            <q-input
                type="number"
                :min="MINIMUM_PASSCODE_LENGTH"
                :max="MAXIMUM_PASSCODE_LENGTH"
                v-model="length"
                label="Length"
                hint="(optional)"
                outlined
                standout
                dense
            />
            <q-input
                type="number"
                :min="MINIMUM_DIGIT"
                :max="MAXIMUM_DIGIT"
                v-model="firstDigit"
                label="First Digit"
                hint="(optional)"
                outlined
                standout
                dense
            />
            <q-btn-group spread>
                <q-btn label="Submit" type="submit" color="primary" no-caps />
                <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    class="q-ml-sm"
                    no-caps
                    flat
                />
            </q-btn-group>
            <q-btn-group spread>
                <q-input
                    v-model="passcode"
                    label="Passcode"
                    outlined
                    standout
                    dense
                    filled
                    readonly
                />
                <q-btn color="secondary" @click="onCopy" no-caps>
                    <q-icon name="file_copy" />
                    <q-tooltip
                        transition-show="scale"
                        transition-hide="jump-down"
                        >Copy passcode</q-tooltip
                    >
                    Copy
                </q-btn>
            </q-btn-group>
        </q-form>
    </q-page>
</template>

<style scoped lang="scss">
#passcode {
    #form {
        .q-toolbar__title {
            padding: 15px;
        }
    }
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePasscodeStore } from '../stores';
import {
    copyInput,
    getPasscode,
    MAXIMUM_DIGIT,
    MAXIMUM_PASSCODE_LENGTH,
    MINIMUM_DIGIT,
    MINIMUM_PASSCODE_LENGTH
} from '../utils';

const store = usePasscodeStore();
const firstDigit = ref<number>();
const length = ref<number>();
const passcode = ref<number>();

onMounted(() => {
    firstDigit.value = store.firstDigit;
    length.value = store.length;
    passcode.value = store.passcode;
});
const onChange = () => {
    store.setFirstDigit(firstDigit.value);
    store.setLength(length.value);
    store.setPasscode(passcode.value);
};
const onCopy = () => {
    if (passcode.value) {
        const message = `Passcode ${passcode.value} copied to the clipboard!`;
        copyInput(passcode.value, message);
    }
};
const onReset = () => {
    delete firstDigit.value;
    delete length.value;
    delete passcode.value;
    store.resetFirstDigit();
    store.resetLength();
    store.resetPasscode();
};
const onSubmit = () => {
    store.setFirstDigit(firstDigit.value);
    store.setLength(length.value);
    passcode.value = getPasscode(length.value, firstDigit.value);
    store.setPasscode(passcode.value);
};
</script>
