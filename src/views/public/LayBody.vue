<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="/dashboard|articles/">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>
<script>
    export default {
        name: 'LayBody',
    }
</script>
