import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites, onRemove, onAdd, onClear }) => {
  // Handle when an item is dragged over the favorites list
  const handleDragOver = (e) => {
    e.preventDefault(); // Allows dropping
  };

  // Handle when an item is dropped into the favorites list
  const handleDrop = (e) => {
    e.preventDefault();
    const propertyData = e.dataTransfer.getData("property");
    if (propertyData) {
      const property = JSON.parse(propertyData);
      onAdd(property); // Add the property to the favorites list
    }
  };

  // Handle drag start for items already in favorites
  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("propertyId", propertyId);
  };

  // Handle drop to remove an item from the favorites list
  const handleDropToRemove = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    if (propertyId) {
      onRemove(propertyId); // Remove the property from the favorites list
    }
  };

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {/* Drop zone for adding items */}
      <div
        className="favorites-list"
        onDragOver={handleDragOver}
        onDrop={handleDrop} // Add items by drag-and-drop
      >
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          favorites.map((fav) => (
            <div
              key={fav.id}
              className="favorite-item"
              draggable
              onDragStart={(e) => handleDragStart(e, fav.id)} // Set drag data
            >
              
              <p>
                {fav.type} - {fav.id} <br />
                RS. {fav.price.toLocaleString()}
              </p>
              <button onClick={() => onRemove(fav.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      {/* Drop zone for removing items */}
      <div
        className="remove-zone"
        onDragOver={handleDragOver}
        onDrop={handleDropToRemove} // Remove items by drag-and-drop
      >
        Drag here to remove
      </div>
      {favorites.length > 0 && (
        <button className="clear-favorites-btn" onClick={onClear}>
          Clear Favorites
        </button>
      )}
    </div>
  );
};

export default Favorites;
