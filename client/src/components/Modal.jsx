import { useState } from "react";
import { Cookies, useCookies } from "react-cookie";

import { MdOutlineCancel } from "react-icons/md";

const Modal = ({ mode, setShowModal, getData, task }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const authToken = cookies.authToken;
    const editMode = mode === "edit" ? true : false;
    const [data, setData] = useState({
        description: editMode ? task.description : "",
    });

    // getting data from database
    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVERURL}/tasks/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookies.authToken}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.status === 200) {
                setShowModal(false);
                getData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const editData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVERURL}/${task.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.status === 200) {
                setShowModal(false);
                getData();
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    };
    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title">
                    <h3>Let's {mode} Your Task</h3>
                    <MdOutlineCancel
                        className="cancel"
                        onClick={() => setShowModal(false)}
                    />
                </div>

                <form>
                    <input
                        className="input"
                        required
                        maxLength={30}
                        placeholder="What do you want to do?"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        className={mode}
                        type="submit"
                        onClick={editMode ? editData : postData}
                    />
                </form>
            </div>
        </div>
    );
};

export default Modal;
