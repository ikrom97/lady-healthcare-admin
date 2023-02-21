import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageWrapper from './components/layouts/PageWrapper/PageWrapper';
import ProductsPage from './components/pages/ProductsPage/ProductsPage';
import { AdminRoute } from './const';
import ProductsCreatePage from './components/pages/ProductsCreatePage/ProductsCreatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AdminRoute.HOME} element={<PageWrapper/>}>
          <Route path={AdminRoute.ADMIN} element={<Navigate to={AdminRoute.PRODUCTS} />} />
          <Route path={AdminRoute.PRODUCTS} element={<ProductsPage />} />
          <Route path={AdminRoute.PRODUCTS_CREATE} element={<ProductsCreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
