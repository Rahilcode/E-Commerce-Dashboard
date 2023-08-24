import React, { useState } from "react";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const handleClick = async () => {
    if (!name || !price || !category || !company) {
      alert("please add all the details");
      setError(true);
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.user._id;
    const auth = user.auth;
    console.log(userId, auth);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${auth}`,
      },
    });
    result = await result.json();

    setName("");
    setCategory("");
    setCompany("");
    setPrice("");

    if (result) {
      setError(false);
      alert("Product added successfully");
    }
  };

  return (
    <div className="productsForm">
      <h1>Add Products</h1>
      {error && !name && <span className="error">Enter valid name</span>}
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !price && <span className="error">Enter price name</span>}
      <input
        type="text"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !category && <span className="error">Enter category name</span>}
      <input
        type="text"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !company && <span className="error">Enter Company name</span>}
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

export default AddProducts;
