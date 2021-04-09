import "./App.css";
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';

function App() {
    const {token, userId, login, logout} = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    return (
        <AuthContext.Provider value={{
            token,login,logout,userId,isAuth
        }}>
            <Router>
                <div className="App">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
