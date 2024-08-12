import { UserIcon, FacebookIcon, GoogleIcon } from '~/components/Icons';

const auth = {
    signup: {
        header: 'Sign up for Tiktok',
        listBtn: [
            {
                Icon: UserIcon,
                title: 'Use phone or email',
                onclick: () => {},
            },
            {
                Icon: FacebookIcon,
                title: 'Continue with Facebook',
                onclick: () => {
                    window.open(process.env.REACT_APP_FACEBOOK_AUTH_URL, '_self');
                },
            },
            {
                Icon: GoogleIcon,
                title: 'Continue with Google',
                onclick: () => {
                    window.open(process.env.REACT_APP_GOOGLE_AUTH_URL, '_self');
                },
            },
        ],
        footerTitle: 'Already have an account?',
        navigateBtn: 'Log in',
    },
    login: {
        header: 'Log in to Tiktok',
        listBtn: [
            {
                Icon: UserIcon,
                title: 'Use phone / email',
                onclick: () => {},
            },
            {
                Icon: FacebookIcon,
                title: 'Continue with Facebook',
                onclick: () => {
                    window.open(process.env.REACT_APP_FACEBOOK_AUTH_URL, '_self');
                },
            },
            {
                Icon: GoogleIcon,
                title: 'Continue with Google',
                onclick: () => {
                    window.open(process.env.REACT_APP_GOOGLE_AUTH_URL, '_self');
                },
            },
        ],
        footerTitle: "Don't have account?",
        navigateBtn: 'Sign up',
    },
};

export default auth;
