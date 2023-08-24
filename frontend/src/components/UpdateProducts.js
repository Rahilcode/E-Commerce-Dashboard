import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = user.auth;

  const navigate = useNavigate();

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/product/" + params.id, {
      headers: {
        authorization: `Bearer ${auth}`,
      },
    });
    result = await result.json();
    if (result._id) {
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleClick = async () => {
    let result = await fetch("http://localhost:5000/product/" + params.id, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${auth}`,
      },
    });
    result = await result.json();

    if (result) {
      alert("Product details updated successfully");
      navigate("/");
    }
  };
  return (
    <div className="productsForm">
      <h1>Update Product</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className="btn"
        type="submit"
        value={"Submit"}
        onClick={handleClick}
      />
    </div>
  );
};

export default UpdateProducts;
