import React from 'react';

export const AuthPage = () => {
  return(
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Админ</h1>
        <div className="card teal darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>

            <div class="input-field">
            <input 
              placeholder="Enter email" 
              id="email" 
              type="text" 
              name='email'
              className='orange-input'
              />
            <label htmlFor="email">Email</label>
          </div>

          <div class="input-field">
            <input 
              placeholder="Enter password" 
              id="password" 
              type="text" 
              name='password'
              className='orange-input'
              />
            <label htmlFor="email">Email</label>
          </div>

           <div>
           </div>
          </div>
          <div className="card-action">
           <button className='btn deep-orange darken-1'>Войти</button>
           <button className='btn grey lighten-2 black-text'>Регистрация</button>
          </div>
        </div>
      </div>
    </div> 
  )
}