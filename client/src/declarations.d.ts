declare module '*.module.less' {
    const classes: {
        [className: string]: string;
    };
    export default classes;
}

declare module '*.svg';
declare module '*.png';

// globals
declare const API_URL: string;
