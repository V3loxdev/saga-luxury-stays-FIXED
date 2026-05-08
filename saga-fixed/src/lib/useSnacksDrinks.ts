import { useState, useEffect } from 'react';
import type { SnackDrink } from './snacksDrinks';
import { snacksDrinks as DEFAULT_ITEMS } from './snacksDrinks';

const STORAGE_KEY = 'saga-snacks-drinks';

const readStoredItems = (): SnackDrink[] | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as SnackDrink[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
};

const persistItems = (items: SnackDrink[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useSnacksDrinks = () => {
  // Always seed with default items so the page is never empty
  const [snacksDrinksList, setSnacksDrinksList] = useState<SnackDrink[]>(() => {
    const stored = readStoredItems();
    return stored ?? DEFAULT_ITEMS;
  });
  const [isInitialized, setIsInitialized] = useState(true);

  // Persist any changes
  useEffect(() => {
    persistItems(snacksDrinksList);
  }, [snacksDrinksList]);

  const updateItems = (updater: (prev: SnackDrink[]) => SnackDrink[]) => {
    setSnacksDrinksList(prev => {
      const updated = updater(prev);
      persistItems(updated);
      return updated;
    });
  };

  const toggleAvailability = (id: string) => {
    updateItems(prev => prev.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const addSnackDrink = (item: Omit<SnackDrink, 'id'>) => {
    const newItem = { ...item, id: `item-${Date.now()}`, available: true };
    updateItems(prev => [...prev, newItem]);
  };

  const updateSnackDrink = (id: string, updates: Partial<SnackDrink>) => {
    updateItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteSnackDrink = (id: string) => {
    updateItems(prev => prev.filter(item => item.id !== id));
  };

  const availableItems = () => snacksDrinksList.filter(item => item.available);

  return {
    snacksDrinks: snacksDrinksList,
    availableItems,
    toggleAvailability,
    addSnackDrink,
    updateSnackDrink,
    deleteSnackDrink,
    isInitialized,
  };
};

export type { SnackDrink } from './snacksDrinks';
