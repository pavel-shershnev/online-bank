<template>
<the-navbar></the-navbar>

<div class="container with-nav">
    <app-message></app-message>
   <router-view></router-view>
</div>
</template>
<script>
import AppMessage from '@/components/ui/appMessage'
import TheNavbar from '@/components/TheNavbar'
export default {
    components: {TheNavbar, AppMessage}
}
</script>