<template>
  <div class="container">
    <app-message />
    <router-view></router-view>
  </div>
</template>
<script>
import AppMessage from '@/components/ui/appMessage'
export default {
    components: {AppMessage}
}
</script>