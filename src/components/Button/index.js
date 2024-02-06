function Button({children, onclick, disabled}) {
    return ( 
        <button onClick={onclick} disabled={disabled}>{children}</button>
     );
}

export default Button;