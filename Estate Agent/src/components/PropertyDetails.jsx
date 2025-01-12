import React, { useState } from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import Tabs from "./Tabs";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const property = propertiesData.find((prop) => prop.id === id); // Find the property by ID

  const [mainImage, setMainImage] = useState(property?.images[0]);

  if (!property) return <p>Property not found.</p>;

  const tabs = [
    { label: "Description", content: <p>{property.description}</p> },
    {
      label: "Floor Plan",
      content: property.floorPlan ? (
        <img src={property.floorPlan} alt="Floor Plan" />
      ) : (
        <p>Floor plan not available.</p>
      ),
    },
    {
      label: "Map",
      content: property.googleMap ? (
        <img src={property.googleMap} alt="Google Map" />
      ) : (
        <p>Location is not provided.</p>
      ),
    },
  ];

  return (
    <div className="property-details">
      <div className="short-description">
        <h2>{property.type}</h2>
        <p>Price: Rs. {property.price.toLocaleString()}</p>
        <p>Location: {property.location}</p>
      </div>

      <div className="large-image">
        <img src={mainImage} alt="Large view" />
      </div>

      <div className="thumbnails">
        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setMainImage(image)}
            className={mainImage === image ? "active-thumbnail" : ""}
          />
        ))}
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default PropertyDetails;
