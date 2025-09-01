import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = ({ creators, setCreators }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        if (isMounted) setForm({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
        });
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [id]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { ...form };
      if (!payload.imageURL) payload.imageURL = null;
      const { error } = await supabase
        .from('creators')
        .update(payload)
        .eq('id', id);
      if (error) throw error;
      // Update creators state
      if (setCreators && creators) {
        setCreators(
          creators.map((c) =>
            c.id === Number(id) ? { ...c, ...payload } : c
          )
        );
      }
      navigate(`/creator/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm('Delete this creator?')) return;
    try {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) throw error;
      // Update creators state
      if (setCreators && creators) {
        setCreators(creators.filter((c) => c.id !== Number(id)));
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  };

  if (loading) return <p>Loading…</p>;
  return (
    <div>
      <h1>Edit Creator</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSave} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="url" placeholder="URL" value={form.url} onChange={onChange} required />
        <input name="imageURL" placeholder="Image URL (optional)" value={form.imageURL} onChange={onChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} required />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          <button type="button" onClick={onDelete} style={{ backgroundColor: 'crimson', color: 'white' }}>Delete</button>
          <button type="button" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
