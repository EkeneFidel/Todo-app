import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Modal from "../components/Modal";

const Header = ({ header, getData }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [showModal, setShowModal] = useState(false);

    const signOut = () => {
        removeCookie("email");
        removeCookie("userName");
        removeCookie("authToken");
    };

    return (
        <div className="header">
            <h1>{header}</h1>
            <div className="btn-container">
                <button className="create" onClick={() => setShowModal(true)}>
                    Add
                </button>
                <button className="signout" onClick={signOut}>
                    Signout
                </button>
            </div>
            {showModal && (
                <Modal
                    mode={"create"}
                    setShowModal={setShowModal}
                    getData={getData}
                />
            )}
        </div>
    );
};

export default Header;
