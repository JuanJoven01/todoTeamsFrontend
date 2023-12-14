import { Link } from 'react-router-dom'

import './redButton.css'


const RedButton = (props) => {
    return (
        <Link to={props.href} >
            <button className="red__button rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">{props.text}</button>
        </Link>
    )
        
        
}

export default RedButton