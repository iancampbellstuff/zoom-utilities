<template>
    <q-layout id="main-layout" view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title> Zoom Utilities </q-toolbar-title>
                <q-tabs v-model="tabName">
                    <q-route-tab
                        v-for="t in tabs"
                        :icon="t.icon"
                        :key="t.name"
                        :label="t.label"
                        :name="t.name"
                        :to="t.route"
                        @click="onTabClick(t.name)"
                        no-caps
                        exact
                    />
                    <q-tab
                        icon="clear"
                        label="Clear All"
                        name="clearAll"
                        @click="onClearAllClick"
                        no-caps
                    />
                </q-tabs>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer id="footer" elevated>
            <q-toolbar>
                <q-toolbar-title id="footer-text">
                    <a
                        title="https://github.com/iancampbellstuff"
                        href="https://github.com/iancampbellstuff"
                        >https://github.com/iancampbellstuff</a
                    >
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<style scoped lang="scss">
#main-layout {
    #footer {
        text-align: center;
        #footer-text {
            font-size: 90%;
        }
    }
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeetingsStore, usePasscodeStore } from '../../stores';
import { tabs } from './mainTabs';
import { toast } from '../../utils';

const router = useRouter();
const meetingsStore = useMeetingsStore();
const passcodeStore = usePasscodeStore();
const tabName = ref(tabs[0].name);
const path = ref<string>();

onMounted(() => {
    const route = useRoute();
    path.value = route.path;
});
const onClearAllClick = () => {
    meetingsStore.resetAll();
    passcodeStore.resetAll();
    const { value } = path;
    if (value !== '/' && value !== '/home') {
        //TODO: Promises must be handled appropriately or explicitly marked as ignored with the `void` operator.eslint@typescript-eslint/no-floating-promises
        void router.push('home');
    }
    toast('All fields have been cleared.');
};
const onTabClick = (tabName: string) => {
    tabName = tabName;
};
</script>
