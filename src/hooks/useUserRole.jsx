import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData = {}, isLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data; // expects response like { role: "admin" }
    },
  });

  return {
    role: roleData?.role,
    isRoleLoading: isLoading,
    refetchRole: refetch,
  };
};

export default useUserRole;
