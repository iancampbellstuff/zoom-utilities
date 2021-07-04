<template>
    <q-page id="passcode" class="row items-center justify-evenly">
        <q-form
            id="form"
            class="q-gutter-sm"
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
                :min="minimumPasscodeLength"
                :max="maximumPasscodeLength"
                v-model="length"
                label="Length"
                hint="(optional)"
                outlined
                standout
                dense
            />
            <q-input
                type="number"
                :min="minimumDigit"
                :max="maximumDigit"
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
                    ref="passcode"
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

<style lang="scss" scoped>
#passcode {
    #form {
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import {
    copyInput,
    getPasscode,
    MAXIMUM_DIGIT,
    MAXIMUM_PASSCODE_LENGTH,
    MINIMUM_DIGIT,
    MINIMUM_PASSCODE_LENGTH
} from '../utils';
interface IData {
    firstDigit?: number;
    length?: number;
    maximumDigit: number;
    maximumPasscodeLength: number;
    minimumDigit: number;
    minimumPasscodeLength: number;
    passcode?: number;
}
export default Vue.extend({
    name: 'Passcode',
    data(): IData {
        return {
            firstDigit: undefined,
            length: undefined,
            maximumDigit: MAXIMUM_DIGIT,
            maximumPasscodeLength: MAXIMUM_PASSCODE_LENGTH,
            minimumDigit: MINIMUM_DIGIT,
            minimumPasscodeLength: MINIMUM_PASSCODE_LENGTH,
            passcode: undefined
        };
    },
    methods: {
        onChange() {
            this.$store.commit('passcodeModule/setLength', this.length);
            this.$store.commit('passcodeModule/setFirstDigit', this.firstDigit);
            this.$store.commit('passcodeModule/setPasscode', this.passcode);
        },
        onCopy() {
            const ref = this.$refs.passcode as HTMLInputElement;
            if (ref && this.passcode) {
                const message = `Passcode ${this.passcode} copied to the clipboard!`;
                copyInput(ref, message);
            }
        },
        onReset() {
            this.length = undefined;
            this.firstDigit = undefined;
            this.passcode = undefined;
            this.$store.commit('passcodeModule/resetLength');
            this.$store.commit('passcodeModule/resetFirstDigit');
            this.$store.commit('passcodeModule/resetPasscode');
        },
        onSubmit() {
            this.passcode = getPasscode(this.length, this.firstDigit);
            this.$store.commit('passcodeModule/setLength', this.length);
            this.$store.commit('passcodeModule/setFirstDigit', this.firstDigit);
            this.$store.commit('passcodeModule/setPasscode', this.passcode);
        }
    },
    mounted: function() {
        this.length = this.$store.getters['passcodeModule/getLength'];
        this.firstDigit = this.$store.getters['passcodeModule/getFirstDigit'];
        this.passcode = this.$store.getters['passcodeModule/getPasscode'];
    }
});
</script>
