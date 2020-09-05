import React, {useState} from 'react';

import {sendCredentials} from '../../api/login';
import Input from '../../components/Input';
import Button from '../../components/Button';
import InvalidCredentials from '../../components/InvalidCredentials';

import Fingerprint from '../../assets/images/fingerprint.svg';

import classes from './LoginPage.module.less';


async function validateCredentials({username, password}, setInvalidCredentials) {
    const {isValid, token} = await sendCredentials({username, password});
    
    if (isValid) {
        const url = new URL(window.location.href);
        const redirectBaseUrl = new URL(decodeURIComponent(url.searchParams.get('continue')));

        redirectBaseUrl.searchParams.set('token', token);
        window.location.replace(redirectBaseUrl.href);
    } else {
        setInvalidCredentials();
    }
}


function LoginPage() {
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.fingerprint}><Fingerprint /></div>
            <h1>Authenticate</h1>
            <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                label="Username"
            />
            <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                label="Password"
            />

            <Button
                label="Login"
                onClick={() => {
                    validateCredentials(
                        {username, password},
                        () => setIsInvalidCredentials(true)
                    );
                }}
            />
            {isInvalidCredentials ? <InvalidCredentials /> : <div className={classes.placeholder} />}
        </div>
        <div className={classes.footer}>
            Team Bravo
        </div>
    </div>;
}

export default LoginPage;
