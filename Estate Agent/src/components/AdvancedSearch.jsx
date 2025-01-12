import React, { useState } from "react";

const AdvancedSearch = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="advanced-search">
      <h2>Advanced Search</h2>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="minBedrooms"
        placeholder="Min Bedrooms"
        value={filters.minBedrooms}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxBedrooms"
        placeholder="Max Bedrooms"
        value={filters.maxBedrooms}
        onChange={handleChange}
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={filters.type}
        onChange={handleChange}
      />
      {/* <input
        type="text"
        name="postcode"
        placeholder="Postcode Area (e.g., BR1)"
        value={filters.postcode}
        onChange={handleChange}
      />
      <input
        type="date"
        name="startDate"
        placeholder="Start Date"
        value={filters.startDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        placeholder="End Date"
        value={filters.endDate}
        onChange={handleChange}
      /> */}
      <button onClick={() => onFilter(filters)}>Apply Filters</button>
    </div>
  );
};

export default AdvancedSearch;
