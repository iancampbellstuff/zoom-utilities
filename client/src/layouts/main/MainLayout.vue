<template>
    <q-layout id="main-layout" view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>
                    Zoom Utilities
                </q-toolbar-title>
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
                        title="https://github.com/icampbell2"
                        href="https://github.com/icampbell2"
                        >https://github.com/icampbell2</a
                    >
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<style lang="scss" scoped>
#main-layout {
    #footer {
        text-align: center;
        #footer-text {
            font-size: 90%;
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { toast } from '../../utils';
import { ITab, tabs } from './mainTabs';
interface IData {
    tabName: string;
    tabs: ITab[];
}
export default Vue.extend({
    name: 'MainLayout',
    data(): IData {
        return {
            tabName: '',
            tabs
        };
    },
    methods: {
        onClearAllClick() {
            this.$store.commit('passcodeModule/resetAll');
            const { path } = this.$router.currentRoute;
            if (path !== '/' && path !== '/home') {
                //TODO: Promises must be handled appropriately or explicitly marked as ignored with the `void` operator.eslint@typescript-eslint/no-floating-promises
                void this.$router.push('home');
            }
            toast('All fields have been cleared.');
        },
        onTabClick(tabName: string) {
            this.tabName = tabName;
        }
    }
});
</script>
