import { useState } from "react";
import { useCookies } from "react-cookie";

const Login = ({ onFormSwitch }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [email, setEmail] = useState("");
    const [password, setPassw] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(import.meta.env.VITE_SERVERURL);

        const response = await fetch(
            `${import.meta.env.VITE_SERVERURL}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
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
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
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
                    onChange={(e) => setPassw(e.target.value)}
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                />
                <button className="auth-btn">Login</button>
            </form>
            <div className="error">{error && <p>{error} </p>}</div>
            <button
                className="link-btn"
                onClick={() => {
                    onFormSwitch("signup");
                }}
            >
                Don't have an account? Register here
            </button>
        </div>
    );
};

export default Login;
