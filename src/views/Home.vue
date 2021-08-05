<template>
<app-loader v-if="loading"></app-loader>
<div v-else>
  <app-page title="Список заявок">
   
    <template #header> 
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
          <request-filter v-model="filter"></request-filter>
          <request-table :requests="requests" ></request-table>

        
          <teleport to="body">

              <app-modal v-if="modal" title="создать заявку" @close="modal = false">
                <request-modal @created="modal = false"></request-modal>
              </app-modal>

          </teleport>

  </app-page> 
</div>
  
</template>

<script>
import RequestFilter from '@/components/request/requestFilter'
import AppPage from '@/components/ui/appPage'
import RequestTable from '@/components/request/requestTable'
import RequestModal from '@/components/request/requestModal'
import AppModal from '@/components/ui/appModal'
import AppLoader from '@/components/ui/appLoader'

import {ref, computed, onMounted, watch} from 'vue'
import {useStore} from 'vuex'

export default {
  name: 'Home',
  components: {AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter},
  setup(props) {
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})


  function close() {
    modal.value = false
  }

  const store = useStore()

  onMounted(async ()=> {
    loading.value = true
    await store.dispatch('request/load')
    loading.value = false
    }) 

  const requests = computed(() => store.getters['request/requests']
    .filter(request => {
  
      if(filter.value.name) {
     
        return request.fio.includes(filter.value.name)
      }
      return request
    })
    .filter(request => {
      if(filter.value.status){
        return request.status === filter.value.status
      }
      return request
    })
  )
  console.log(requests);
    return {
      modal,
      close,
      requests,
      loading,
      filter
    }
  }
}
</script>
