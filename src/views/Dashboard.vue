<template>
  <div class="home">
    <Sources msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Sources from '@/components/Sources.vue'

export default {
  name: 'Dashboard',
  components: {
    Sources
  }
}
</script>
