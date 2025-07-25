"use client";
import React from "react";
import { useAddUserMutation } from "@/redux/features/api/userSlice";

const Blog = () => {
  const [addUser, { data, isLoading, isError }] = useAddUserMutation();

  console.log("Data: ", data);

  const handleSubmit = () => {
    const sendData = {
      userId: 1,
      id: 1,
      title: "Testing Title",
      body: "Post body",
    };
    addUser(sendData);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Blog Page</h2>
      <button
        disabled={isLoading}
        className="bg-blue-500 p-3 text-sm rounded-full mt-2 mb-3 disabled:opacity-60"
        onClick={handleSubmit}
      >
        Post Data
      </button>

      {isError && <div className="text-red-500">Cann't Post Data!</div>}

      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        provident illo maxime nostrum fugiat totam qui sapiente quam
        reprehenderit cumque vel, consectetur facere facilis esse impedit
        incidunt laborum unde placeat?
      </div>
    </div>
  );
};

export default Blog;
