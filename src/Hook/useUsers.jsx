import { useQuery } from "@tanstack/react-query";
import React from 'react';

const useUsers = () => {
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REAC_APP_BACKEND_URL}/users`);
      return res.json();
    },
  });
  return [users,refetch, isPending];
};


export default useUsers;