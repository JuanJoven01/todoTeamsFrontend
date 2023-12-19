import React, { useState } from 'react'
import { createPortal } from 'react-dom';

import PurpleButton from '../../components/button';

import ErrorDialog from '../../components/errorDialog';
import SuccessfulDialog from '../../components/successfulDialog';
import Loading from '../../components/loading';

import axios from 'axios';

import './activationCode.css'


const ActivationCode = () => {    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([false]);
    const [successful, setSuccessful] = useState([false]);


    // To get the token from the url and save it in a variable

    const resendActivationCode = async () => {
        setLoading(true);
        const email = document.querySelector('.activation-code__input').value;

        const backendUrl = 'https://todo-teams-backend.onrender.com';

        try {
            let res = await axios.post(backendUrl+'/new-user/resend-activation', 
                {
                    mail: email
                },
                {
                    headers: {
                        'api-key': 'EstoEsSoloUnaPrueba',
                        'Accept': '*/*',
                        'link': 'teams.juanjoven.com'
                
                    }
                }
            );
            if (res.data.error) {
                setError([true, 'Error', res.data.error])
                setLoading(false)
              }
              else{
                setSuccessful([true, 'Success', 'Activation code sent successfully'])
                let data = res.data;
                setLoading(false)        
              }
        } catch (error) {
            setError([true, 'Error', error.response.data.message]);
            setLoading(false);

        }
        
    }
    

    return (
        
        <div className="activation-code">
            <h1 className="activation-code__title">Here you can resend a activation link/code</h1>
            <p className="activation-code__subtitle">If you do not have an activation link/code or the one you have has expired, enter your email in the form box and you will be resend one valid for 15 minutes to validate your email.</p>

            {loading && createPortal(<Loading />, document.body)}
            {error[0] && createPortal(<ErrorDialog title='Error' message={error[1]} onClose={() => setError([false])} />, document.body)}
            {successful[0] && createPortal(<SuccessfulDialog title='Successful' message={successful[1]} onClose={() => setSuccessful([false])} />, document.body)}
            
            <form className="activation-code__form">
                <input className="activation-code__input" type="text" placeholder="Insert your email here" />
                <div onClick={resendActivationCode} >
                    <PurpleButton className='activation-code__button' href='' text='Resend activation link/code'/>
                </div>
            </form>

            

        </div>


    )
}

export default ActivationCode