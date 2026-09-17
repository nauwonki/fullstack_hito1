import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import { DevSettingsProvider } from './context/DevSettingsContext';
import { QuoteProvider } from './context/QuoteContext';
import { DemoNavBanner } from './components/common/DemoNavBanner';
import { Navbar } from './components/layout/Navbar';
import { CategoryDrawer } from './components/layout/CategoryDrawer';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { QuotePage } from './pages/QuotePage';
import { instrumentsData } from './data/instruments';

const AppContent: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<{ root?: string; sub?: string; type?: string } | null>(null);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleSelectCategoryFilter = (filter: { root?: string; sub?: string; type?: string }) => {
    setActiveFilter(filter);
  };

  const handleQuickFilter = (root: string) => {
    setActiveFilter((prev) => (prev?.root === root ? null : { root }));
  };

  const handleClearFilter = () => {
    setActiveFilter(null);
    setSearchTerm('');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* 1. Botón Grande / Banner de Navegación Demo Placeholder */}
      <DemoNavBanner />

      {/* 2. Navbar Principal */}
      <Navbar
        onOpenDrawer={handleOpenDrawer}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* 3. Menú Lateral Desplegable (Categorías) */}
      <CategoryDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onSelectCategoryFilter={handleSelectCategoryFilter}
      />

      {/* 4. Rutas Principales */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                instruments={instrumentsData}
                searchTerm={searchTerm}
                activeFilter={activeFilter}
                onClearFilter={handleClearFilter}
                onOpenDrawer={handleOpenDrawer}
                onQuickFilter={handleQuickFilter}
              />
            }
          />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/cotizacion" element={<QuotePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      {/* 5. Footer */}
      <Footer />
    </Box>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DevSettingsProvider>
        <QuoteProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </QuoteProvider>
      </DevSettingsProvider>
    </ThemeProvider>
  );
}
