import { watch, computed} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm () {
  
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const {value: emaill, errorMessage: eError, handleBlur: eBlur} = useField(
      'email',
      yup
        .string()
        .trim()
        .required('введите email')
        .email('введите правильный email')
      )

    const minPas = 7
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
      'password',
      yup
        .string()
        .trim()
        .required('введите пароль')
        .min(minPas, password => {
          if(password.value.length<5){return `пароль д.б не менее 5 символов, сейчас он ${password.value.length}` }
        },)
    )
    const tooManyAttempts = computed(() => submitCount.value>3) 
    watch(tooManyAttempts, val => {
      if(val) {
        setTimeout(() => submitCount.value = 0 , 5000)
      }
    })
 
    const onSubmit = handleSubmit(async values=>{
      await store.dispatch('auth/login', values)
      router.push('/')
    })
    
    return {
      emaill, eError, eBlur,
      password, pError, pBlur,
      onSubmit, 
      isSubmitting,
      submitCount,
      tooManyAttempts
    }
}