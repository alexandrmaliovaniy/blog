import "./App.css";
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import Header from './components/Header/Header';
import Preloader from './components/Preloaders/PagePreloader';

function App() {
    const {token, userId, login, logout, userLogin, ready} = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);

    if (!ready) {
        return (<Preloader />);   
    }

    return (
        <AuthContext.Provider value={{
            token,login,logout,userId,isAuth,userLogin
        }}>

            <Router>
                <div className="App">
                    <Header />
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
