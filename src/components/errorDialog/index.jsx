import './errorDialog.css'

// const ErrorDialog = (props) => {
//     return (
//         <div className="error" >
//             <div className="error__total bg-indigo-900 text-center py-4 lg:px-4">
//                 <div className="p-2 bg-indigo-800 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
//                     <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{props.title}</span>
//                     <span className="font-semibold mr-2 text-left flex-auto">{props.message}</span>
//                     <svg className="fill-current opacity-75 h-7 w-7" onClick={props.onClose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
//                 </div>
//             </div>
//         </div>
        
//     )
// }

const ErrorDialog = (props) => {
    return (
        <div className="error" >
            <div className="error__total bg-orange-900 text-center py-4 lg:px-4">
                <div className="p-2 bg-orange-800 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-orange-500 uppercase px-2 py-1 text-xs font-bold mr-3">{props.title}</span>
                    <span className="font-semibold mr-2 text-left flex-auto">{props.message}</span>
                    <svg className="fill-current opacity-75 h-7 w-7" onClick={props.onClose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                </div>
            </div>
        </div>
        
    )
}

export default ErrorDialog