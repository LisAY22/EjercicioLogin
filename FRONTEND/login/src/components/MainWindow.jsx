import Home from './Home';
import PrivateRoutes from '../utils/PrivateRoutes';
import Login from './login';

import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

function LayoutContent() {
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isLogin = location.pathname === '/login';
    const mainClasses = isHome || isLogin
        ? 'flex-grow-1 overflow-y-auto overflow-x-hidden p-0'
        : 'flex-grow-1 overflow-y-auto overflow-x-hidden p-3 p-lg-4 mb-2'; 

    return (
            <div className='d-flex flex-column flex-lg-row min-vh-100'>
                
                <main className={mainClasses}>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                    </Routes>
                </main>
            </div>
    );
}

function MainWindow() {
    return (
        <BrowserRouter>
            <LayoutContent />
        </BrowserRouter>
    );
}

export default MainWindow;