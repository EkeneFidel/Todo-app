import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function Signup({ onFormSwitch }) {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassw, setConfirmPassw] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassw) {
            setError("Make sure passwords match!");
            return;
        }

        const response = await fetch(
            `${import.meta.env.VITE_SERVERURL}/auth/signup`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, email, password }),
            }
        );
        const data = await response.json();
        if (data.success === false) {
            setError(data.message);
            setTimeout(() => {
                setError(null);
            }, 2000);
        } else {
            const user = data.user;
            setCookie("email", user.email);
            setCookie("userName", user.userName);
            setCookie("authToken", data.token);
        }
    };

    return (
        <>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="username"></label>
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="Enter your username"
                    id="username"
                    name="username"
                />
                <label htmlFor="email"></label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                />
                <label htmlFor="password"></label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                />
                <label htmlFor="confirm-password"></label>
                <input
                    value={confirmPassw}
                    onChange={(e) => setConfirmPassw(e.target.value)}
                    type="password"
                    placeholder="confirm password"
                    id="confirm-password"
                    name="confirm-password"
                />
                <button className="auth-btn">Register</button>
            </form>
            <div className="error">{error && <p>{error} </p>}</div>
            <button className="link-btn" onClick={() => onFormSwitch("login")}>
                Login here
            </button>
        </>
    );
}
