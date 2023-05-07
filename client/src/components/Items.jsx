import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

import Modal from "../components/Modal";

const Items = ({ task, getData }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({ isCompleted: task.isCompleted });
    const authToken = cookies.authToken;

    const deleteItem = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVERURL}/tasks/${task.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.status === 200) {
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheck = async (e) => {
        const { name, checked } = e.target;
        setData((data) => ({
            ...data,
            [name]: checked,
        }));
        await update(checked);
    };

    const update = async (checked) => {
        try {
            const body = JSON.stringify({ isCompleted: checked });
            const response = await fetch(
                `${import.meta.env.VITE_SERVERURL}/tasks/${task.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: body,
                }
            );
            await response.json();
            if (response.status === 200) {
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {!showModal && (
                <div className="item">
                    <input
                        type="checkbox"
                        name="isCompleted"
                        id="checkbox"
                        checked={data.isCompleted}
                        onChange={(e) => handleCheck(e)}
                    />
                    <div
                        className={`info-container ${
                            data.isCompleted ? "checked" : ""
                        }`}
                    >
                        <p>{task.description}</p>
                    </div>
                    <div className="icon-container">
                        <FaPencilAlt
                            className="edit-icon"
                            onClick={() => setShowModal(true)}
                        />
                        <FaTrashAlt className="delete" onClick={deleteItem} />
                    </div>
                </div>
            )}

            {showModal && (
                <Modal
                    mode={"edit"}
                    setShowModal={setShowModal}
                    getData={getData}
                    task={task}
                />
            )}
        </>
    );
};

export default Items;
