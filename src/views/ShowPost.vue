<template>
  <suspense>
    <template #default>
      <post-viewer />
    </template>

    <template #fallback>
      <spinner />
    </template>

  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostViewer from '@/views/PostViewer.vue'
import Spinner from '@/components/UI/Spinner.vue'

export default defineComponent({
  components: {
    PostViewer,
    Spinner
  }
});
</script>