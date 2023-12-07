import { Link } from 'react-router-dom'

import './button.css'


const PurpleButton = (props) => {
    return (
        <Link to={props.href} >
            <button className="purple__button rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{props.text}</button>
        </Link>
    )
        
        
}

export default PurpleButton