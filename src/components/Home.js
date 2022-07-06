import React,{useContext} from 'react';
import VersionTable from "./Table";

import authContext from "../context/auth/authContext";

const Home = () => {
    const auth = useContext(authContext);
    const {isAuthenticated} = auth;
    if(!isAuthenticated){

    }
    return (

        <VersionTable/>
    );
};

export default Home;