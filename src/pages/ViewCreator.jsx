import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchOne = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        if (isMounted) setCreator(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load creator');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchOne();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!creator) return <p>Not found</p>;

  return (
    <div>
      <h1>{creator.name}</h1>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} style={{ width: 240, borderRadius: 8 }} />
      )}
      <p>{creator.description}</p>
      <p>
        <a href={creator.url} target="_blank" rel="noopener noreferrer">
          {creator.url}
        </a>
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to={`/creator/${creator.id}/edit`}>Edit</Link>
        <button type="button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

export default ViewCreator;
