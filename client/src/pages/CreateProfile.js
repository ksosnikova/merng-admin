import React from 'react';
import { Form } from '../components/Form';

export const CreateProfile = () => {
  
  return (
    <div className='row formProfileContainer'>
      <h4>Создать профиль</h4>
      <Form isEdit={false} />
    </div>
  )
}