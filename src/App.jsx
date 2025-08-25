import { useRoutes } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import { supabase } from './client';
import './App.css';


function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCreators = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setCreators(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load creators');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      await fetchCreators();
    })();
    return () => {
      active = false;
    };
  }, [fetchCreators]);

  const routes = useRoutes([
    { path: '/', element: <ShowCreators creators={creators} loading={loading} error={error} /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator onUpdated={fetchCreators} /> },
    { path: '/add', element: <AddCreator onCreated={fetchCreators} /> },
  ]);

  return <div className="App">{routes}</div>;
}

export default App
