import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { email, registry, z } from 'zod'
import { scheme } from './validation'


const initialState = {
  username: "",
  email: "",
  fullName: "",
  age: null,
  phone: ""
}

const App = () => {
  const { register, handleSubmit, isSubmitting, formState: { errors, touchedFields } } = useForm({
    resolver: zodResolver(scheme),
    defaultValues: initialState
  });


  const onSubmitFunction = (values) => {
    console.log(values);
  }



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>

        <div className=''>
          <label htmlFor="">Full Name</label>
          <input type="text" placeholder='enter Full Name' {...register("fullName")} />
          {touchedFields.fullName && errors.fullName && <p>{errors.fullName.message}</p>}
        </div>

        <div className=''>
          <label htmlFor="">Username</label>
          <input type="text" placeholder='enter Username' {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className=''>
          <label htmlFor="">Email</label>
          <input type="text" placeholder='enter Email' {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className=''>
          <label htmlFor="">Phone</label>
          <input type="text" placeholder='enter Phone' {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div className=''>
          <label htmlFor="">Age</label>
          <input type="number" placeholder='enter Age' {...register("age")} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <div className=''>
          <label htmlFor="">Password</label>
          <input type="password" placeholder='enter Password' {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button>{isSubmitting ? "Yuborilmoqda" : "Submit"}</button>

      </form>
    </div>
  )
}

export default App

// uncontrolled components
// controlled components
