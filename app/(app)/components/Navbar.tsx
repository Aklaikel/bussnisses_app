"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <div className="bg-gray-100 py-2 px-4 border-b border-gray-100 w-full">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center text-lg font-bold cursor-pointer">
                        <span className="text-gray-800">Fire Base </span>
                    </div>
                </Link>
                <Link href="/login">
                <div className="space-x-4">
                    <button className="bg-black text-white px-3 py-2 rounded-md font-semibold">
                        Log in
                    </button>
                </div>
                </Link>
            </div>
        </div>
    );
}