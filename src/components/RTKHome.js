"use client";
import { useGetUsersQuery } from "@/redux/features/api/userSlice";
import Link from "next/link";

export default function RTKHome() {
  // const [request, setRequest] = useState(true);
  const { isLoading, data, isError, refetch } = useGetUsersQuery(null);

  if (isLoading) return <span>Loading...</span>;

  if (isError) return <span>There is an error Fetching data!</span>;

  return (
      <div>
        <h2>Album </h2>
        <button
          className="bg-blue-500 p-3 text-sm rounded-full mt-2 mb-3"
          onClick={refetch}
        >
          Refetch Data
        </button>
        <div className="grid grid-cols-3 gap-3">
          {data &&
            data.map((item) => (
              <div key={item.id}>
                <Link className="cursor-pointer" href={`/${item.id}`}>
                  <img src={item.url} alt={item.title} />
                </Link>
              </div>
            ))}
        </div>
      </div>
  );
}
