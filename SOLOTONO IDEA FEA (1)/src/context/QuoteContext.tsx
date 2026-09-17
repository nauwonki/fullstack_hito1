import React, { createContext, useContext, useState, useEffect } from 'react';
import { Instrument, StoreOffer, Accessory, QuoteItem } from '../types';

interface QuoteContextType {
  items: QuoteItem[];
  addToQuote: (instrument: Instrument, offer: StoreOffer, selectedAccessories?: Accessory[]) => void;
  removeFromQuote: (itemId: string) => void;
  clearQuote: () => void;
  totalPrice: number;
  itemCount: number;
}

const STORAGE_KEY = 'solotono_quote_items_v1';

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving quote items to localStorage:', e);
    }
  }, [items]);

  const addToQuote = (instrument: Instrument, offer: StoreOffer, selectedAccessories: Accessory[] = []) => {
    const newItem: QuoteItem = {
      id: `${instrument.id}-${offer.storeId}-${Date.now()}`,
      instrumentId: instrument.id,
      instrumentNombre: instrument.nombre,
      instrumentImagen: instrument.imagen,
      storeName: offer.storeName,
      storePrice: offer.price,
      addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      accesoriosExtra: selectedAccessories,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const removeFromQuote = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => {
    const accTotal = (item.accesoriosExtra || []).reduce((accSum, acc) => accSum + acc.precio, 0);
    return sum + item.storePrice + accTotal;
  }, 0);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addToQuote,
        removeFromQuote,
        clearQuote,
        totalPrice,
        itemCount: items.length,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
