import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from './_pages/LoginSignup';
import DashboardHome from './_pages/Dasboard';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Manage from './_pages/manage';

const RouteMap: React.FC = () => {

    const auth = useSelector((state: RootState) => state.auth);
    console.log(auth)
    return (<>
        {auth.isLoggedIn ? <>
            <DashboardHome />
        </>
            :
            <LoginSignUp />
        }
    </>
    );
};

export default RouteMap;

// redux set chenayam