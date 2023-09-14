<template>
  <div class="global-content">
    <router-view v-slot="{ Component }">
        <keep-alive :include="/dashboard|articles/">
            <component :is="Component" />
        </keep-alive>
    </router-view>
  </div>
</template>
<script setup name="LayBody">
</script>
