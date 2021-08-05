<template>
    <div v-if="message" :class="['alert', message.type]">
        <p class="alert-title">{{title}}</p>
        <p>{{message.value}}</p>
        <span class="alert-close" @click="close">&times;</span>
    </div>
</template>
<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
    setup() {
        const store = useStore()

        const TITLE_MAP = {
            primary: 'успешно!',
            danger: 'Ошибка',
            warning: 'Внимание'
        }
        
        const title = computed ( ()=> message.value ? TITLE_MAP[message.value.type] : null)
        const message = computed(()=> store.state.message)

        function close() {
            store.commit('clearMessage')
        }
        return {
            message,
            title,
            close
        }
   }
    
}
</script>