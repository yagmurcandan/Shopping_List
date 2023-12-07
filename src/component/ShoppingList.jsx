import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { nanoid } from "nanoid";
import { styled } from "styled-components";

export const StyledButton = styled.button`
  margin-top: 32px;
  border-radius: 5px;
  color: white;
  border: none;
  inline-size: 8%;
`;

const ShoppingList = (props) => {
  const markets = props.markets;
  const categories = props.categories;

  const [marketID, setMarketID] = useState(markets[0].id);
  const [categoryID, setCategoryID] = useState(categories[0].id);
  const [productName, setProductName] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props?.onAdd?.({
          marketID,
          categoryID,
          productName,
          id: nanoid(),
        });
      }}
    >
      <div className="d-flex gap-4 ms-2 mt-4">
        <Form.Group controlId="productForm.market">
          <Form.Label>Market Name</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {markets.find((market) => market.id === marketID).name}
            </Dropdown.Toggle>

            <Dropdown.Menu className="text-black">
              {markets.map((market) => (
                <Dropdown.Item
                  key={market.id}
                  onClick={() => setMarketID(market.id)}
                >
                  {market.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group controlId="productForm.category">
          <Form.Label>Category Name</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {categories.find((category) => category.id === categoryID).name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category.id}
                  onClick={() => setCategoryID(category.id)}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group controlId="product.name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className="bg-success text-white"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <StyledButton className="bg-success" type="submit">
          Add Product
        </StyledButton>
      </div>
    </Form>
  );
};

export default ShoppingList;
