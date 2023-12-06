import React from 'react';



import { VscGithub } from "react-icons/vsc";
import { TfiInstagram } from "react-icons/tfi";


import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer__github">
                <VscGithub className='github__logo'/>
                <a href="https://github.com/JuanJoven01" target="_blank" rel="noreferrer">@JuanJoven01</a>
            </div>

            <div className="footer__instagram">
                <TfiInstagram className='instagram__logo' />
                <a href="https://www.instagram.com/juanjoven01/" target="_blank" rel="noreferrer">@JuanJoven01</a>
            </div>
            


        </footer>
    );
}

export default Footer;