import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = ({ onCreated }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = { ...form };
      if (!payload.imageURL) delete payload.imageURL; // optional
      const { error } = await supabase.from('creators').insert([payload]);
      if (error) throw error;
      if (onCreated) await onCreated();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to add creator');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Creator</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="url" placeholder="URL" value={form.url} onChange={onChange} required />
        <input name="imageURL" placeholder="Image URL (optional)" value={form.imageURL} onChange={onChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} required />
        <button type="submit" disabled={submitting}>{submitting ? 'Adding…' : 'Add Creator'}</button>
        <button type="button" onClick={() => navigate('/')} style={{ marginTop: '8px' }}>Back to Home</button>
      </form>
    </div>
  );
};

export default AddCreator;
