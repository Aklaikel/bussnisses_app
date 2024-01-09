import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function Login() {
    const email = useSelector((state: any) => state);
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const login = async () => {
        console.log("data of the user login", email);
        const { error, data } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });
        if (error) {
            console.log(error);
            toast.error("Invalid login credentials");
        } else {
            const authToken = data.session.access_token;
            dispatch({ type: "setTheme", payload: username });
            document.cookie = `authToken=${authToken}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/`;
            router.push('/dashboard');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="bg-gray-800 flex flex-col justify-center h-screen">
            <form
                className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-4xl text-gray-500 font-bold text-center ">
                    LOG IN
                </h2>
                <div className="flex flex-col text-gray-400 py-2">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full my-5 py-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/40 text-white font-semibold rounded-lg"
                    type="submit"
                >
                    SIGN IN
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}