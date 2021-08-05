import {useForm, useField} from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm(fn) {
   const {isSubmitting, handleSubmit} = useForm({
       initialValues: {
           status: 'active',
           fio: 1
       }
   }) 

   const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
       'fio',
       yup.string()
       .trim()
       .required('кто ты воин?')
       )
   const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
       'phone',
       yup.string()
       .required('введите номер телефона')
       )
   const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
       'amount',
       yup.number()
       .required('введите сумму')
       .min(0, 'сумма не может быть меньше 0')
       )
   const {value: status} = useField('status')
   const onSubmit = handleSubmit(fn)

   return {
       status,
       isSubmitting,
       onSubmit,
       fio,fError,fBlur,
       phone,pError,pBlur,
       amount,aError,aBlur
 
   }
}