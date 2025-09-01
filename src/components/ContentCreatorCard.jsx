import React from 'react';
import { Link } from 'react-router-dom';
import './ContentCreatorCard.css';

const ContentCreatorCard = ({ id, name, url, description, imageURL }) => {
  const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

  return (
    <div className="card creator-card horizontal-card">
      {imageURL && (
        <img src={imageURL} alt={name} className="creator-image-horizontal" />
      )}
      <div className="card-body creator-info-horizontal">
        <h2 className="card-title">
          <Link to={`/creator/${id}`}>{name}</Link>
        </h2>
        <p className="card-text card-desc-white">{description}</p>
        <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{name}'s Page</a>
        <div className="card-buttons">
          <Link to={`/creator/${id}/edit`} className="btn btn-secondary">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorCard;
