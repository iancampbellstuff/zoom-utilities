<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<style scoped lang="scss">
#q-app {
}
</style>

<script setup lang="ts">
// clear service workers
if (navigator.serviceWorker) {
    void navigator.serviceWorker
        .getRegistrations()
        .then((serviceWorkerRegistrations) => {
            for (const serviceWorkerRegistration of serviceWorkerRegistrations) {
                void serviceWorkerRegistration.unregister();
            }
        });
}
</script>
