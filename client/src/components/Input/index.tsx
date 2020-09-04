import React from 'react';

import classes from './Input.module.less';


function Input({label, value, onChange=(e) => {}, ...rest}) {
    return <div className={classes.container}>
        <input
            className={value === "" ? classes.empty : null}
            value={value}
            onChange={onChange}
            {...rest}
        />
        <div className={classes.label}>{label}</div>
    </div>;
}

export default Input;
