import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar.jsx";
import AdvancedSearch from "./components/AdvancedSearch";
import PropertyCard from "./components/PropertyCard";
import Favorites from "./components/Favorites";
import PropertyDetails from "./components/PropertyDetails";
import "./styles/styles.css";
import Footer from "./components/Footer";
import propertiesData from "./data/properties.json";

const App = () => {
  const [properties, setProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on app load
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = propertiesData.filter((property) =>
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProperties(filtered);
  };

  const handleAdvancedSearch = (filterCriteria) => {
    const { minPrice, maxPrice, minBedrooms, maxBedrooms, type } = filterCriteria;
    const filtered = propertiesData.filter((property) => {
      const meetsPrice =
        (!minPrice || property.price >= minPrice) &&
        (!maxPrice || property.price <= maxPrice);
      const meetsBedrooms =
        (!minBedrooms || property.bedrooms >= minBedrooms) &&
        (!maxBedrooms || property.bedrooms <= maxBedrooms);
      const meetsType = !type || property.type.toLowerCase() === type.toLowerCase();
      return meetsPrice && meetsBedrooms && meetsType;
    });
    setProperties(filtered);
  };

  const addToFavorites = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      const updatedFavorites = [...favorites, property];
      setFavorites(updatedFavorites);

      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);

    // Update localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);

    // Clear localStorage
    localStorage.removeItem("favorites");
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Real Estate Finder</h1>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <AdvancedSearch onFilter={handleAdvancedSearch} />
                <div className="main-content">
                  <div className="properties-list">
                    {properties.length > 0 ? (
                      properties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          onAddToFavorites={addToFavorites}
                        />
                      ))
                    ) : (
                      <p>No results found.</p>
                    )}
                  </div>
                  <Favorites
                    favorites={favorites}
                    onRemove={removeFromFavorites}
                    onAdd={addToFavorites}
                    onClear={clearFavorites}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/property/:id"
            element={<PropertyDetails />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
