import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadItem, saveItem } from './storage';
import type { Client, Estimate, Photo } from '../types';

interface DataContextShape {
  clients: Client[];
  estimates: Estimate[];
  photos: Photo[];
  addClient: (c: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addEstimate: (e: Omit<Estimate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addPhoto: (p: Omit<Photo, 'id' | 'createdAt'>) => void;
}

const DataContext = createContext<DataContextShape | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      setClients(await loadItem<Client[]>('clients', []));
      setEstimates(await loadItem<Estimate[]>('estimates', []));
      setPhotos(await loadItem<Photo[]>('photos', []));
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    saveItem('clients', clients);
  }, [clients]);
  useEffect(() => {
    saveItem('estimates', estimates);
  }, [estimates]);
  useEffect(() => {
    saveItem('photos', photos);
  }, [photos]);

  const addClient: DataContextShape['addClient'] = (c) => {
    const now = new Date();
    setClients((prev) => [
      ...prev,
      { id: `${Date.now()}`, createdAt: now, updatedAt: now, ...c },
    ]);
  };

  const addEstimate: DataContextShape['addEstimate'] = (e) => {
    const now = new Date();
    setEstimates((prev) => [
      ...prev,
      { id: `${Date.now()}`, createdAt: now, updatedAt: now, ...e },
    ]);
  };

  const addPhoto: DataContextShape['addPhoto'] = (p) => {
    setPhotos((prev) => [
      { id: `${Date.now()}`, createdAt: new Date(), ...p },
      ...prev,
    ]);
  };

  const value = useMemo(
    () => ({ clients, estimates, photos, addClient, addEstimate, addPhoto }),
    [clients, estimates, photos]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}