<template>
    <router-view v-slot="{ Component }">
      <keep-alive :include="/dashboard|articles/">
          <component :is="Component" />
      </keep-alive>
    </router-view>
</template>
<script setup name="LayBody">
</script>
