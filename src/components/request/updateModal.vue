<template>
<form @submit.prevent="onSubmit">
<div class="form-control" :class="{invalid: fError}"> 
        <label for="fio">ФИО</label>
        <input type="text" id="fio" v-model="fio" @blur="fBlur">
        <small v-if="fError">{{fError}}</small>
    </div>
    <div class="form-control" :class="{invalid: pError}"> 
        <label for="phone">Телефон</label>
        <input type="text" id="phone" v-model.number="phone" @blur="pBlur">
        <small v-if="pError">{{pError}}</small>
    </div>
    <div class="form-control" :class="{invalid: aError}"> 
        <label for="amount">Сумма</label>
        <input type="text" id="amount" v-model.number="amount" @blur="aBlur">
        <small v-if="aError">{{aError}}</small>
    </div>

    <div class="form-control"> 
        <label for="status">Статус</label>
        <select id="status" v-model="status">
            <option value="done">завершен</option>
            <option value="cancelled">отменен</option>
            <option value="active">активен</option>
            <option value="pending">выполняется</option>
        </select>
    </div>
    <button class="btn primary" :disabled="isSubmitting">обновить</button>
</form>
</template>
<script>

import {useStore}  from 'vuex'
import {route, useRoute} from 'vue-router'

import {useUpdateForm} from '@/use/update-form'
export default {
    props: ['request'],
    emits: ['updated'],
    setup(props, {emit}) {
        const store = useStore()
        const route = useRoute()
        const id = route.params.id
        const submit = async values => {
            await store.dispatch('request/update', {...values, id})
            emit('updated')
        }
        return {
            ...useUpdateForm(submit, props.request)
        }
    }
}
</script>
