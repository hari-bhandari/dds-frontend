import React, {useContext, useState} from 'react';
import DDS from './Dashing Distribution Software.svg'
import authContext from "../context/auth/authContext";
import {Modal} from "antd";
import AddVersion from "./AddVersion";

const Navbar = () => {
    const auth = useContext(authContext);
    const {isAuthenticated,logout} = auth;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <nav className="navbar navbar-dark navbar-expand-md fixed-top navbar-shrink py-3" id="mainNav">
            <div className="container"><a className="navbar-brand d-flex align-items-center" href="/">
                <span className=" d-flex justify-content-center align-items-center me-2 bs-icon">
                    <img src={DDS} alt="" height={'70px'}/></span></a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
                    </ul>
                    {isAuthenticated ? (<a className="btn btn-primary shadow" role="button" onClick={showModal}>Add version</a>) : (<a className="btn btn-primary shadow" role="button" href="/login">Login</a>)}
                    {isAuthenticated&&<a className="btn btn-primary shadow" role="button" onClick={()=>{
                        logout();
                        window.location.reload();
                    }}>Logout</a>}
                </div>

            </div>
            <Modal title="Add new Version" visible={isModalVisible} onCancel={handleCancel} footer={false} width={720}>
                <AddVersion />
            </Modal>
        </nav>
    );
};

export default Navbar;