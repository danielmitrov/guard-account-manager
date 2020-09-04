import React from 'react';

import classes from './Button.module.less';


function handleKeyPress(e: React.KeyboardEvent, onClick) {
    if (e.key === "Enter" || e.key === " ") {
        onClick();
    }
}

function Button({label, onClick=() => {}, ...rest}) {
    return <div
        tabIndex={0}
        className={classes.button}
        onClick={onClick}
        onKeyPress={e => handleKeyPress(e, onClick)}
        {...rest}
    >
        {label}
    </div>;
}

export default Button;
