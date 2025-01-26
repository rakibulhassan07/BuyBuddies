import React from 'react';
import { useQuery } from '@tanstack/react-query';

const useReviews = () => {
     const {
         isPending,
         data: reviews = [],
         refetch,
       } = useQuery({
         queryKey: ["reviews"],
         queryFn: async () => {
           const res = await fetch(
             "http://localhost/BuyBuddies/index.php/api/reviews"
           );
           return res.json();
         },
       });
       return [reviews, refetch, isPending];
};

export default useReviews;