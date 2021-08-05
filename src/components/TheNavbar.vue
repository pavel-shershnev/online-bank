<template>
    <nav class="navbar">
        <h3>LimitSpd</h3>

        <ul class="navbar-menu">
            <li>
                <router-link to="/">Заявки</router-link>
            </li>
            <li>
                <router-link to="/help">Помощь</router-link>
            </li>
            <li>
                <a href="#">Сообщения</a>
            </li>
            <li>
                <a href="#" @click.prevent="logout">Выход</a>
            </li>
        </ul>
    </nav>
</template>
<script>
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
export default {
    setup(props) {
        const router = useRouter()
        const store = useStore()
        return {
            logout: () => {
                store.commit('auth/logout')
                router.push('/auth')
            }
        }
    }
}
</script>