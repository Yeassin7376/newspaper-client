// Publisher Spotlight
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllPublishers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], isLoading, isError } = useQuery({
    queryKey: ["all-publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-bars loading-sm"></span>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load publishers.
      </div>
    );

  return (
    <section className="">
        <h2 className="text-3xl font-bold mb-10">
          Publisher Spotlight
        </h2>
      <div className="container mx-auto px-6 py-12 bg-base-200">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {publishers.map((publisher) => (
            <div
              key={publisher._id}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-32 h-32 rounded-full bg-base-100 shadow-md flex items-center justify-center overflow-hidden transform transition-transform duration-300 group-hover:scale-110">
                <img
                  src={publisher.logoUrl || "/default-logo.png"}
                  alt={publisher.displayName}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="mt-3 text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {publisher.displayName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPublishers;
