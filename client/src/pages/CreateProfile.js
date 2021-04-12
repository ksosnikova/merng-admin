import React from 'react';
import { Form } from '../components/Form';

export const CreateProfile = () => {
  
  return (
    <div className='row formProfileContainer'>
      <h4>Create profile</h4>
      <Form isEdit={false} />
    </div>
  )
}