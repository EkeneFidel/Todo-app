import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Items from "./components/Items";

function App() {
    const [currForm, setCurrForm] = useState("login");
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [tasks, setTasks] = useState(null);
    const authToken = cookies.authToken;

    const toggleForm = (formName) => {
        setCurrForm(formName);
    };

    const getData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVERURL}/tasks/`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const json = await response.json();
            setTasks(json.tasks);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (authToken) {
            getData();
        }
    }, []);

    //sort tasks by date
    const sortedTasks = tasks?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return (
        <div className="app">
            <div className="container">
                {!authToken && (
                    <>
                        {currForm === "login" ? (
                            <Login onFormSwitch={toggleForm} />
                        ) : (
                            <Signup onFormSwitch={toggleForm} />
                        )}
                    </>
                )}

                {authToken && (
                    <>
                        <Header
                            header={`Welcome Back ${cookies.userName}`}
                            getData={getData}
                        />
                        {!tasks && <p>No Tasks</p>}
                        <div className="item-container">
                            {sortedTasks?.map((task) => (
                                <Items
                                    key={task.id}
                                    task={task}
                                    getData={getData}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;

{
    /* <div className="header">
                <h1>Todo List</h1>
                <h3>Welcome Ekene</h3>
            </div>

            <form className="form">
                <input type="text" placeholder="Add Todo Item" />
                <button type="submit">Add</button>
            </form>

            <div className="lists">
                <div className="list-item">
                    <input type="checkbox" />
                    <p className="item-content">Hello</p>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                </div>
                <div className="list-item">
                    <input type="checkbox" />
                    <p className="item-content">Hello</p>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                </div>
                <div className="list-item">
                    <input type="checkbox" />
                    <p className="item-content">Hello</p>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                </div>
            </div> */
}
