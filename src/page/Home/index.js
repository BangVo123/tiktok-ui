import GoogleAuth from '~/components/GoogleAuth/GoogleAuth';

function Home() {
    return (
        <>
            <h1>Home page</h1>
            <GoogleAuth title={'Continue with google'} />
        </>
    );
}

export default Home;
