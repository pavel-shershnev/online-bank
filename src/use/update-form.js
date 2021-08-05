import {useForm, useField} from 'vee-validate'
import * as yup from 'yup'

export function useUpdateForm(func, request) {
   const {isSubmitting, handleSubmit} = useForm({
       initialValues: {
           status: '',
           fio: request.fio,
           phone: request.phone,
           amount: request.amount,
           status: request.status
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
   const onSubmit = handleSubmit(func)
   return {
       status,
       isSubmitting,
       onSubmit,
       fio,fError,fBlur,
       phone,pError,pBlur,
       amount,aError,aBlur
 
   }
}