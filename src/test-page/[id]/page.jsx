"use client";

import { useGetUserByIdQuery } from "@/redux/features/api/userSlice";
const singlePage = ({ params }) => {
  const { isLoading, data, isError } = useGetUserByIdQuery(params.id);
  if (isLoading) return <span>Loading...</span>;

  if (isError) return <span>There is an error Fetching data!</span>;
  return (
    <div>
      <div>Single Photo</div>
      <h2 className="text-2xl py-3">Title: {data.title}</h2>

      <img src={data.url} alt="" />
    </div>
  );
};

export default singlePage;
