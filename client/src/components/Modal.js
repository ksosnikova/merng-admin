import React from 'react';
import { Form } from './Form';

export const Modal = ({ profile, onClick }) => {

  return (
    <div className='modalContainer'>
      <div className='modalInnerContainer'>
        <i className='material-icons edit-icon' onClick={onClick}>close</i>
        <Form
          profile={profile}
          isEdit={true}
        />
      </div>
    </div>
  )
}