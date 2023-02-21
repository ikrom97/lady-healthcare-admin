import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageWrapper from './components/layouts/PageWrapper';
import ProductsCreatePage from './components/pages/ProductsCreatePage/ProductsCreatePage';
import ProductsSelectedPage from './components/pages/ProductsSelectedPage/ProductsSelectedPage';
import { AdminRoute } from './const';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AdminRoute.HOME} element={<PageWrapper />}>
          <Route path={AdminRoute.ADMIN} element={<Navigate to={AdminRoute.PRODUCTS} />} />
          <Route path={AdminRoute.PRODUCTS} element={<ProductsSelectedPage />} />
          <Route path={AdminRoute.PRODUCTS_CREATE} element={<ProductsCreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
