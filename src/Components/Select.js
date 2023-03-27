import React, { useState } from 'react';
import flags from '../Utils/flags';
import '../CSS/Select.css';

let countryCode;
function Select() {
    const [code, setCode] = useState("");

    function handleChange(e) {
        e.preventDefault();
        setCode(e.target.value);
    }

    countryCode = code;

    return (
        <>
            <select name="countryCode" id="countryCode" className='countryCode' onChange={handleChange}>
                {flags.map((cc, index) => {
                    return (
                        <option key={index}>{cc.number + " " + cc.name}</option>
                    )
                })}
            </select>

        </>
    );
};

export { Select, countryCode };