import React from 'react';
import { Link } from 'react-router-dom';
import ContentCreatorCard from '../components/ContentCreatorCard';

const ShowCreators = ({ creators = [], loading, error }) => {
  if (loading) return <p>Loading creators...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!creators.length)
    return (
      <div>
        <p>No content creators yet. Add one!</p>
        <Link to="/add">Add Creator</Link>
      </div>
    );

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/add">+ Add Creator</Link>
      </div>
      <div className="creators-grid">
      {creators.map((c) => (
        <ContentCreatorCard
          key={c.id}
            id={c.id}
          name={c.name}
          url={c.url}
          description={c.description}
          imageURL={c.imageURL}
        />
      ))}
      </div>
    </div>
  );
};

export default ShowCreators;
