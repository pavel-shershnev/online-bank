import axios from '../../axios/request'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
           requests: [] 
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const token = store.getters['auth/setToken']
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload)   
                commit('addRequest', {...payload, id: data.name})
                dispatch('setMessage', {
                    value: 'заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: 'e.message',
                    type: 'danger'
                }, {root: true})
            }
        },
        async load({commit, dispatch}) {
            try {
                const token = store.getters['auth/setToken']
                const {data} = await axios.get(`/requests.json?auth=${token}`)  
                if(data){
                    const requests = Object.keys(data).map(id => ({...data[id], id}))
                    commit('setRequests', requests)
                }
                return
                
            } catch (e) {
                dispatch('setMessage', {
                    value: 'e.message',
                    type: 'danger'
                }, {root: true})
               
            }
        },
        async loadById({commit, dispatch}, id) {
            try {
                const token = store.getters['auth/setToken']               
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)              
                return {...data, id: id}
            } catch (e) {
                dispatch('setMessage', {
                    value: 'e.message',
                    type: 'danger'
                }, {root: true})
            }
        },
        async remove({commit, dispatch}, id) {
            try {
                const token = store.getters['auth/setToken']               
                await axios.delete(`/requests/${id}.json?auth=${token}`)              
                dispatch('setMessage', {
                    value: 'заявка успешно удалена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: 'e.message',
                    type: 'danger'
                }, {root: true})
            }
        },
        async update({commit, dispatch}, {values}) {
            try {
                const token = store.getters['auth/setToken']   
                         
                await axios.patch(`/requests/${values.id}.json?auth=${token}`, values)
                console.log('values',values);  
                console.log('id',values.id);         
                dispatch('setMessage', {
                    value: 'заявка успешно обновлена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: 'e.message',
                    type: 'danger'
                }, {root: true})
            }
        },
    }
}