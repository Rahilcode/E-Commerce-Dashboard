import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = user.auth;
  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `Bearer ${auth}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    let result = await fetch("http://localhost:5000/product/" + id, {
      method: "delete",
      headers: {
        authorization: `Bearer ${auth}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Item successfully deleted");
      getProducts();
    }
  };

  const handleSearch = async (e) => {
    let search = e.target.value;
    if (!search) {
      getProducts();
      return;
    }
    let result = await fetch("http://localhost:5000/search/" + search, {
      headers: {
        authorization: `Bearer ${auth}`,
      },
    });
    result = await result.json();
    if (result) {
      setProducts(result);
    }
  };

  return (
    <div className="products">
      <h1>Products List</h1>
      <input
        className="search"
        type="text"
        placeholder="Search Product name or Company"
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>sl.no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Company</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                    <button>
                      <Link to={"/update-products/" + item._id}>Update</Link>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h1>No Results Found</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
