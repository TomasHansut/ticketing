import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header';

// Wrapper arround component for global css
const AppComponent = ({ Component, pageProps }) => {
    return <div>
            <Header {...pageProps}/>
            <Component {...pageProps} />
        </div>
};

export default AppComponent;