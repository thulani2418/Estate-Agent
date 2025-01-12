import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";


const PropertyCard = ({ property, onAddToFavorites, onSelect }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
  };

  return (
    <div
      className="property-card"
      draggable
      onDragStart={handleDragStart}
      onClick={onSelect}
    >
      <Link to={`/property/${property.id}`}>
        <img src={property.picture} alt={property.type} className="property-image" />
        <h3>{property.type} : {property.id}</h3>
        <p>{property.bedrooms} Bedrooms</p>
        <p>Rs.{property.price.toLocaleString()}</p>
        <p>{property.location}</p>
      </Link>
      <button className="add-to-favorites-btn" onClick={() => onAddToFavorites(property)}>Add to Favorites</button>
    </div>
  );
};

export default PropertyCard;
