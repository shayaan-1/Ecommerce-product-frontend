import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import LoginPage from './components/loginPage/LoginPage';
import ViewProducts from './components/viewProducts/ViewProducts';
import ProductDetails from './components/productDetails/ProductDetails';
import AddProduct from './components/addProduct/AddProduct';

const ProtectedRoute = ({ element }) => {
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  return loggedInUser ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute element={<ViewProducts />} />,
  },
  {
    path: '/products/:id',
    element: <ProtectedRoute element={<ProductDetails />} />,
  },
  {
    path: '/add',
    element: <ProtectedRoute element={<AddProduct/>}/>
  }
]);

function App() {
  return (
     <RouterProvider router={router} />
   // <div className='mt-6 bg-black'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus reiciendis corrupti quidem esse unde qui, harum sunt pariatur rem expedita praesentium sapiente natus mollitia error molestias illum quaerat autem quas.</div>
  );
}

export default App;
