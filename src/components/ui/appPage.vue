<template>
    <div class="card"> 
        <h1 class="card-title">
            {{title}} 
            <slot name="header" /></h1>
        <slot />

        <button  v-if="back" class="btn" @click="$router.push('/')">назад к списку заявок</button>
    </div>
</template>
<script>

export default {
    
    props: {
        title: {
            type: String,
            required: true
        },
        back: {type: Boolean},
        default: false
    },
    setup(props) {
        
        document.title = `${props.title} | онлайн банк`    
    
    }
}
</script>