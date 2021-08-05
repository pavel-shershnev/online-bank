<template>
<loader v-if="loading"></loader>
    <app-page back v-else title="Заявка" >
        <p><strong>имя владельца</strong>: {{request.fio}}</p>
        <p><strong>телефон</strong>: {{request.phone}}</p>
        <p><strong>сумма</strong>: {{request.amount}}</p>
        <p><strong>статус</strong>: <app-status :type="request.status" :key="count" /></p>

        <button class="btn danger" @click="remove">удалить</button>
        <button class="btn" @click="modal=true">обновить</button>

        <teleport to='body'>
            <app-modal v-if="modal" title="внесите изменения">
                <update-modal :request="request" @updated="updated"></update-modal>
            </app-modal>
        </teleport>
    </app-page>
</template>
<script>
import AppPage from '@/components/ui/appPage'
import loader from '@/components/ui/appLoader'
import AppStatus from '@/components/ui/appStatus'
import AppModal from '@/components/ui/appModal'
import UpdateModal from '@/components/request/updateModal'

import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
   setup(props) {
      
        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const loading = ref(false)
        const request = ref({})
        const modal = ref(false)
        const count = ref(1)
       
      

        const id = route.params.id

        const updated = async () => {
            // count.value++
           
             modal.value = false 
              const uprequest = await store.dispatch('request/loadById', id)
           
            request.value=uprequest
             count.value++
        }
        
        onMounted(async ()=>{
            loading.value = true
            request.value = await store.dispatch('request/loadById', id)
            loading.value = false
        })
        


        const remove = async ()=> {
            await store.dispatch('request/remove', id)
            router.push('/')
        }


        return {loading, request, remove, modal, updated,count}
   } ,
   components: {AppPage, loader, AppStatus, AppModal, UpdateModal}
}
</script>
