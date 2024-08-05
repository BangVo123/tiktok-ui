import Button from '../Button';

function GoogleAuth({ title }) {
    const login = () => {
        window.open(process.env.REACT_APP_API_URL, '_self');
    };

    return <Button onClick={login}>{title}</Button>;
}

export default GoogleAuth;
