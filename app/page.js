"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Dropdown = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // const inputRef = useRef(null);

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
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleDoubleClick = () => {
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleSelectItem = (item) => {
    setSearchTerm(item.name);
    setShowDropdown(false); // Show all items in dropdown
  };

  const handleHoverItem = (item) => {
    setSearchTerm(item.name);
  };

  //Disappear Dropdown list by outside click

  // const handleOutsideClick = (e) => {
  //   if (inputRef.current && !inputRef.current.contains(e.target)) {
  //     setShowDropdown(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);

  //Item show in dropdown list which you select or focus

  // const filteredItems = items.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const displayItems = searchTerm ? filteredItems : items;

  return (
    <div
      // ref={inputRef}
      style={{ position: "relative", display: "inline-block", margin: "16px" }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onDoubleClick={handleDoubleClick}
        style={{ width: "200px", padding: "8px", borderRadius: "4px" }}
      />
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 999,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "100px",
            overflowY: "auto",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "5px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => handleHoverItem(item)}
              onClick={() => handleSelectItem(item)}
              style={{
                padding: "5px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
                backgroundColor:
                  searchTerm === item.name ? "#f5f5f5" : "transparent",
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