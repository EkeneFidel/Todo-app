import react from "@vitejs/plugin-react-swc";
import http from "https";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

    return defineConfig({
        plugins: [react()],
    });
};
