import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import p1 from '../assets/product1.png';
import promoDefaultImg from '../assets/promo.png';

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [promo, setPromo] = useState({
    sup: '', title: '', desc: '', link: '', img: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ id: 'Admin', key: 'admin' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const { data: prodData } = await supabase.from('products').select('*').order('id', { ascending: true });
      if (prodData) setProducts(prodData);

      const { data: promoData } = await supabase.from('promo').select('*').limit(1).single();
      if (promoData) setPromo(promoData);

      const { data: adminData } = await supabase.from('admin_credentials').select('*').limit(1).single();
      if (adminData) setAdminCredentials(adminData);
    } catch (err) {
      console.error('Error fetching from Supabase', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrUpdateProduct = async (productData, isEdit) => {
    try {
      if (isEdit) {
        // Update local optimistically
        setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
        // Update DB
        const { id, ...updates } = productData;
        await supabase.from('products').update(updates).eq('id', productData.id);
      } else {
        // Insert DB
        const { id, ...inserts } = productData;
        const { data, error } = await supabase.from('products').insert([inserts]).select().single();
        if (error) throw error;
        // Update local with real DB id
        if (data) setProducts(prev => [...prev, data]);
      }
    } catch (err) {
      console.error('Error saving product', err);
      // Fallback refetch if needed
      fetchInitialData();
    }
  };

  const deleteProductLive = async (id) => {
    try {
      setProducts(prev => prev.filter(p => p.id !== id));
      await supabase.from('products').delete().eq('id', id);
    } catch (err) {
      console.error('Error deleting product', err);
      fetchInitialData();
    }
  };

  const updatePromoLive = async (updatedPromo) => {
    try {
      setPromo(updatedPromo);
      const { id, ...updates } = updatedPromo;
      if (id) {
        await supabase.from('promo').update(updates).eq('id', id);
      } else {
        // Fallback for single row update based on known logic
        const { data: exists } = await supabase.from('promo').select('id').limit(1).single();
        if (exists) {
          await supabase.from('promo').update(updates).eq('id', exists.id);
        } else {
          await supabase.from('promo').insert([updates]);
        }
        await fetchInitialData(); // Refresh to get the ID if it was inserted
      }
    } catch (err) {
      console.error('Error updating promo', err);
    }
  };

  const updateCredentialsLive = async (newCredentials) => {
    try {
      setAdminCredentials(newCredentials);
      await supabase.from('admin_credentials').update(newCredentials).eq('id', adminCredentials.id);
    } catch (err) {
      console.error('Error updating credentials', err);
    }
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AppDataContext.Provider value={{
      products, setProducts, addOrUpdateProduct, deleteProductLive,
      promo, setPromo, updatePromoLive,
      isAuthenticated, login, logout,
      adminCredentials, setAdminCredentials, updateCredentialsLive,
      isLoading
    }}>
      {children}
    </AppDataContext.Provider>
  );
};
