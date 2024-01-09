"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Dropdown = () => {
  const [items, setItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectItem, setSelectItem] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
    setShowDropdown(true);
  };

  const handleInputClick = () => {
    setShowDropdown((prevDropdown) => !prevDropdown);
    setSearchItem("");
  };

  const handleClickItem = (item) => {
    setSearchItem(item.name);
    setShowDropdown(false);
    setSelectItem(false);
  };

  const handleHoverItem = (item) => {
    setSearchItem(item.name);
    setShowDropdown(true);
    setSelectItem(true);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "16px",
      }}
    >
      <h1>NextSearch</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchItem}
        onChange={handleInputChange}
        onClick={handleInputClick}
        style={{ width: "250px", padding: "8px", borderRadius: "4px" }}
      />
      {showDropdown && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            width: "250px",
            overflowY: "scroll",
            padding: "8px",
          }}
        >
          {selectItem
            ? items.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => handleHoverItem(item)}
                  onClick={() => handleClickItem(item)}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ccc",
                    backgroundColor:
                      searchItem === item.name ? "#f5f5f5" : "transparent",
                  }}
                >
                  {item.name}
                </div>
              ))
            : filteredItems.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => handleHoverItem(item)}
                  onClick={() => handleClickItem(item)}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ccc",
                    backgroundColor:
                      searchItem === item.name ? "#f5f5f5" : "transparent",
                  }}
                >
                  {item.name}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
