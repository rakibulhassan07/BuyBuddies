
import React from 'react';

import Card from './Card';

const Products  = () => {
    return (
       <div> 
        <div className='pt-12 grid grid-cols-3 gap-16'>
         <Card></Card>
         <Card></Card>
         <Card></Card>
         <Card></Card>
         <Card></Card>
         <Card></Card>
         <Card></Card>
         <Card></Card>
         <Card></Card>
        </div>
       </div>
    );
};

export default Products;