"use client";
import { useGetUsersQuery } from "@/redux/features/api/userSlice";

const Dashboard = () => {
  const { isLoading, data, isError } = useGetUsersQuery();
  if (isLoading) return <span>Loading...</span>;

  if (isError) return <span>There is an error Fetching data!</span>;

  return (
    <div>
      <h2 className="text-3xl font-bold">Dashboard page</h2>
      <br />
      <div className="grid grid-cols-3 gap-3">
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <img src={item.url} alt={item.title} />
              {}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
