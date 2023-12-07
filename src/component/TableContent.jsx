import { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";

const TableContent = ({ product, markets, categories, onCheck, onDelete }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onCheck({ checked, id: product.id });
  }, [checked]);

  return (
    <tr
      onClick={() => {
        setChecked(!checked);
      }}
      key={product.id}
      style={{ textDecoration: checked ? "line-through" : "none" }}
    >
      <td>{markets.find((market) => market.id === product.marketID).name}</td>
      <td>
        {categories.find((category) => category.id === product.categoryID).name}
      </td>
      <td>{product.productName}</td>
      <td>{product.id}</td>
      <td>
        <FormCheck checked={checked} />
      </td>
      <td
        onClick={() => {
          onDelete?.(product.id);
        }}
      >
        <RiDeleteBin6Line />
      </td>
    </tr>
  );
};

export default TableContent;
