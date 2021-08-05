<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Начните писать имя.." v-model="name">
        </div>
        <div class="form-control">
            <select v-model="status">
                <option disabled selected>выберите статус</option>
                <option value="done">завершен</option>
                <option value="cancelled">отменен</option>
                <option value="active">активен</option>
                <option value="pending">выполняется</option>
            </select>
        </div>
        <button v-if="isActive" class="btn danger" @click="clear">сброс фильтра</button>
    </div>
</template>
<script>
import {ref, watch, computed} from 'vue'
export default {
    emits: ['update:modelValue'],
    props: ['modelValue'],
    setup(props, {emit}) {
        const name = ref()
        const status = ref()

        watch([name, status], values=>{
            emit('update:modelValue', {
                name: values[0],
                status: values[1]
            })
        })
        
        const isActive = computed(()=> {if(name.value || status.value) return true})

        return {
            name, status, isActive,
            clear(){name.value = '', status.value= null}
        }
    }
}
</script>