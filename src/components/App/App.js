import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageWrapper from '../layouts/PageWrapper/PageWrapper';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import ProductsShowPage from '../pages/ProductsShowPage/ProductsShowPage';
import { AdminRoute } from '../../const';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AdminRoute.HOME} element={<PageWrapper />}>
          <Route path={AdminRoute.ADMIN} element={<Navigate to={AdminRoute.PRODUCTS} />} />
          <Route path={AdminRoute.PRODUCTS} element={<ProductsPage />} />
          <Route path={AdminRoute.PRODUCTS_SHOW} element={<ProductsShowPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
