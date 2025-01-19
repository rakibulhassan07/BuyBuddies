import Card from "./Card";

import useProducts from "../../Hook/useProducts";

const Products = () => {
  const [products] = useProducts();
  return (
    <div>
      {
        <div className="pt-12 grid grid-cols-3 gap-16">
          {products.map((product) => (
            <Card key={product.id} product={product}></Card>
          ))}
        </div>
      }
    </div>
  );
};

export default Products;
