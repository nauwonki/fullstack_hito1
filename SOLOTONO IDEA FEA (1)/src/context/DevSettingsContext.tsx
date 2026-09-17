import React, { createContext, useContext, useState } from 'react';

interface DevSettingsContextType {
  searchFilterEnabled: boolean;
  setSearchFilterEnabled: (enabled: boolean) => void;
  toggleSearchFilter: () => void;
  demoInstrumentId: string;
}

const DevSettingsContext = createContext<DevSettingsContextType | undefined>(undefined);

export const DevSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchFilterEnabled, setSearchFilterEnabled] = useState<boolean>(true);
  const demoInstrumentId = 'yamaha-f310';

  const toggleSearchFilter = () => {
    setSearchFilterEnabled((prev) => !prev);
  };

  return (
    <DevSettingsContext.Provider
      value={{
        searchFilterEnabled,
        setSearchFilterEnabled,
        toggleSearchFilter,
        demoInstrumentId,
      }}
    >
      {children}
    </DevSettingsContext.Provider>
  );
};

export const useDevSettings = (): DevSettingsContextType => {
  const context = useContext(DevSettingsContext);
  if (!context) {
    throw new Error('useDevSettings must be used within a DevSettingsProvider');
  }
  return context;
};
