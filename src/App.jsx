import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingList from "./component/ShoppingList";
import SelectProducts from "./component/SelectProducts";
import { useState } from "react";

function App() {
  const markets = [
    {
      id: 1,
      name: "Market 1",
    },
    {
      id: 2,
      name: "Market 2",
    },
    {
      id: 3,
      name: "Market 3",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Category 1",
    },
    {
      id: 2,
      name: "Category 2",
    },
    {
      id: 3,
      name: "Category 3",
    },
    {
      id: 4,
      name: "Category 4",
    },
  ];

  const [products, setProducts] = useState([]);

  const onDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <ShoppingList
        markets={markets}
        categories={categories}
        onAdd={(product) => {
          setProducts((oldProducts) => {
            return [...oldProducts, product];
          });
        }}
      />
      <SelectProducts
        markets={markets}
        categories={categories}
        products={products}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
