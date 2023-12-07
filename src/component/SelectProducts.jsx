import { Table } from "react-bootstrap";
import { styled } from "styled-components";
import TableContent from "./TableContent";
import { useEffect, useState } from "react";
import JSConfetti from "js-confetti";

export const StyledTable = styled.table`
  margin-top: 50px;
  width: 80%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SelectProducts = (props) => {
  const products = props.products;
  const markets = props.markets;
  const categories = props.categories;
  const onDelete = props.onDelete;

  const [purchased, setPurchased] = useState([]);
  const [prevPurchasedLength, setPrevPurchasedLength] = useState(
    purchased.length
  );
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    if (
      products.length === purchased.length &&
      products.length > 0 &&
      prevPurchasedLength < purchased.length
    ) {
      jsConfetti.addConfetti(alert("Alışveriş Tamamlandı!"));
    }
  }, [products, purchased, prevPurchasedLength]);

  return (
    <StyledTable>
      <Table striped bordered hover className="m-2">
        <thead>
          <tr>
            <th>Market Name</th>
            <th>Category Name</th>
            <th>Product Name</th>
            <th>ID</th>
            <th>Purchased</th>
            <th>Delete Product</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableContent
              markets={markets}
              categories={categories}
              product={product}
              key={product.id}
              onCheck={(checkedState) => {
                if (checkedState.checked) {
                  setPurchased((prevPurchased) => {
                    setPrevPurchasedLength(prevPurchased.length);
                    return [...prevPurchased, checkedState];
                  });
                } else {
                  setPurchased((prevPurchased) => {
                    setPrevPurchasedLength(prevPurchased.length);
                    return purchased.filter((e) => e.id !== product.id);
                  });
                }
              }}
              onDelete={(id) => {
                onDelete(id);
                setPurchased(purchased.filter((e) => e.id !== id));
              }}
              style={{
                textDecoration: product.checkedState ? "line-through" : "none",
              }}
            />
          ))}
        </tbody>
      </Table>
    </StyledTable>
  );
};

export default SelectProducts;
