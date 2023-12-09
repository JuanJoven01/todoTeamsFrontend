import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import PurpleButton from '../../components/button';

import ErrorDialog from '../../components/errorDialog';
import SuccessfulDialog from '../../components/successfulDialog';
import Loading from '../../components/loading';

import axios from 'axios';

import './activateUser.css'


const ActivateUser = () => {    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([false]);
    const [successful, setSuccessful] = useState([false]);

    const backendUrl = 'https://todo-teams-backend.onrender.com';

    // To get the token from the url and save it in a variable

    const searchParams = new URLSearchParams(location.search);
    const defaultToken = searchParams.get('token');

    const headers = {
        'link': 'teams.juanjoven.com',
        'api-key': 'EstoEsSoloUnaPrueba',
        'Accept': '*/*'
  
      }

    const activateUser = async () => { 
        setLoading(true);
        const token = document.querySelector('.activate-user__input').value;

        try {
            let res = await axios.post(backendUrl+'/new-user/activate-user?token='+token, null, {headers});
            console.log(res)
            if (res.data.error) {
                setError([true, 'Error', res.data.error])
                setLoading(false)
              }
              else{
                setSuccessful([true, 'Success', 'User activated successfully'])
                let data = res.data;
                data = JSON.stringify(data)
                console.log(data)
                setLoading(false)        
              }
        } catch (error) {
            setError([true, 'Error', error]);
            setLoading(false);
            console.log('error')
        }
    }

    return (
        
        <div className="activate-user">
            <h1 className="activate-user__title">Here you can confirm your email and activate your user</h1>
            <p className="activate-user__subtitle">When you create your user, we send you a token for email confirmation and user activation. When accessing from the link you should have the token preloaded in the form. When you click on activate user, it will be activated.</p>
            <p className="activate-user__subtitle">If you have your token and want to activate the user, paste it in the form and press activate user.</p>
            
            {loading && createPortal(<Loading />, document.body)}
            {error[0] && createPortal(<ErrorDialog title='Error' message={error[1]} onClose={() => setError([false])} />, document.body)}
            {successful[0] && createPortal(<SuccessfulDialog title='Successful' message={successful[1]} onClose={() => setSuccessful([false])} />, document.body)}
            
            <form className="activate-user__form">
                <input className="activate-user__input" type="text" placeholder="Insert your token here" defaultValue={defaultToken}  />
                <div onClick={activateUser} >
                    <PurpleButton className='activate-user__button' href='' text='Activate User'/>
                </div>
            </form>

            <Link to='/activation-code' className='activate-user__link' >Haven't you got a token? Resend it here!</Link>

        </div>


    )
}

export default ActivateUser