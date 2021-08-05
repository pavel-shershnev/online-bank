<template>
    <div>
        <span :class="['badge', typeStatus]">{{textStatus}}</span>
    </div>
</template>
<script>
import {ref} from 'vue'
export default {
props: ['type'],
setup(props) {
const mapText = {
    active : 'активен',
    pending : 'выполняется',
    cancelled : 'отменен',
    done : 'завершен'
}
const mapClass = {
    active : 'primary',
    pending : 'warning',
    cancelled : 'danger',
    done : 'primary'
}
const typeStatus = ref(mapClass[props.type])
const textStatus = ref(mapText[props.type])
    return {
        typeStatus, textStatus
    }
}

}
</script>