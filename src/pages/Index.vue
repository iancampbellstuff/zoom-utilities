<template>
    <q-page id="index" class="row items-center justify-evenly">
        <img
            id="logo"
            alt="Zoom Utilities"
            src="../assets/quasar-logo-vertical.svg"
        />
    </q-page>
</template>

<style lang="scss" scoped>
#index {
    #logo {
        width: 80%;
        height: auto;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Index'
});
</script>
