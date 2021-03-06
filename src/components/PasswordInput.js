import React, { useState } from 'react';

const PasswordInput = ({ label, stateType, value, passFunction }) => {
    const [ showEye, setShowEye] = useState( false )
    const [ showPassword, setShowPassword] = useState(false)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            //Fix this please...
            passFunction()
        }
    } 

    return (
    <div><label>{label}</label>
        <input type={ showPassword ? 'text' : 'password' } value={value} onFocus={ () => setShowEye(true) } onBlur={ () => { setShowEye(false); setShowPassword(false) } } onChange={e => stateType(e.target.value)} onKeyPress={handleKeyPress}></input>
        { showEye && <i onMouseOver={() => setShowPassword(true)} onMouseLeave={() => setShowPassword(false)} className={ showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i> }
    </div>
    )
}

export default PasswordInput;
