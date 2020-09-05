import React from 'react';

import classes from './Input.module.less';


function handleKeyPress(e: React.KeyboardEvent, submitForm) {
    if (e.key === "Enter") {
        submitForm();
    }
}

function Input({label, value, submitForm=() => {}, onChange=(e) => {}, ...rest}) {
    return <div className={classes.container}>
        <input
            className={value === "" ? classes.empty : null}
            value={value}
            onChange={onChange}
            onKeyPress={e => handleKeyPress(e, submitForm)}
            {...rest}
        />
        <div className={classes.label}>{label}</div>
    </div>;
}

export default Input;
