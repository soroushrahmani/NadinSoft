<template>
  <router-view/>
</template>

<style>

</style> 


<script lang="ts">
import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }
}
</script>
