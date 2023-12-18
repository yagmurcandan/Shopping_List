import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SelectProducts from "./SelectProducts.jsx";

const options = {
  keys: ["name", "market", "category"],
  threshold: 0.3,
};

const ControlledInputs = () => {
  const [products, setProducts] = useState(SelectProducts);
  const [filteredProducts, setFilteredProducts] = useState(SelectProducts);
  const [filters, setFilters] = useState({
    markets: "",
    categories: "",
    purchased: "tum",
    products: "",
  });
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...SelectProducts];
    if (filters.market) {
      filtered = filtered.filter(
        (product) => product.market === filters.market
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }
    if (filters.purchased !== "tum") {
      const isPurchased = filters.purchased === "alindi";
      filtered = filtered.filter(
        (product) => product.purchased === isPurchased
      );
    }
    if (filters.productName) {
      const fuse = new Fuse(filtered, options);
      filtered = fuse.search(filters.productName);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="m-3 pt-3">
      <label htmlFor="market">Market:</label>
      <select
        id="market"
        value={filters.market}
        onChange={(e) => setFilters({ ...filters, market: e.target.value })}
      >
        <option value="">Tümü</option>
        <option value="Market 1">Market 1</option>
        {/* Diğer market seçenekleri... */}
      </select>

      <br />

      <label htmlFor="category">Kategori:</label>
      <select
        id="category"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">Tümü</option>
        <option value="Kategori 1">Kategori 1</option>
        {/* Diğer kategori seçenekleri... */}
      </select>

      <br />

      <label>Satın Alma Durumu:</label>
      <div>
        <input
          type="radio"
          name="purchased"
          value="tum"
          checked={filters.purchased === "tum"}
          onChange={() => setFilters({ ...filters, purchased: "tum" })}
        />
        Tümü
        <input
          type="radio"
          name="purchased"
          value="alindi"
          checked={filters.purchased === "alindi"}
          onChange={() => setFilters({ ...filters, purchased: "alindi" })}
        />
        Satın Alınanlar
        <input
          type="radio"
          name="purchased"
          value="alilmadi"
          checked={filters.purchased === "alilmadi"}
          onChange={() => setFilters({ ...filters, purchased: "alilmadi" })}
        />
        Satın Alınmayanlar
      </div>

      <br />

      <label htmlFor="productName">Ürün Adı:</label>
      <input
        type="text"
        id="productName"
        value={filters.productName}
        onChange={(e) =>
          setFilters({ ...filters, productName: e.target.value })
        }
      />
    </div>
  );
};

export default ControlledInputs;
