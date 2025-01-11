import React from 'react';
import { useQuery } from '@tanstack/react-query';
const useOrder = () => {
    
        const {
                isPending,
                data: order = [],
                refetch,
              } = useQuery({
                queryKey: ["order"],
                queryFn: async () => {
                  const res = await fetch(
                    "http://localhost/BuyBuddies/index.php/api/order"
                  );
                  return res.json();
                },
              });
              return [order, refetch, isPending];
  
};

export default useOrder;