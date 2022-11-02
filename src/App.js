import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor , Signin  , Signup } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions/index';
import Products from './pages/Products/index'
import  Category from './pages/Category/index'
import  NewPage from './pages/NewPage/index'
import Order from './pages/Orders/index.jsx'

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    

  }, [auth.authenticate]);

  const token = window.localStorage.getItem('token');


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
           {auth.authenticate && activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
           
            
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element= {auth.authenticate? (<Ecommerce />) : <Navigate to={`/signin`} />   }  />
                <Route path="/ecommerce" element= {auth.authenticate? (<Ecommerce />) : <Navigate to={`/signin`} />   }  />

                {/* pages  */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/createPro" element= {auth.authenticate? <Products /> : <Navigate to={`/signin`} />   }/>
                <Route path="/createCategory" element= {auth.authenticate ?  <Category /> : <Navigate to={`/signin`} />   }/>
                <Route path="/NewPage" element= {auth.authenticate ?  <NewPage /> : <Navigate to={`/signin`} />   }/>
                <Route path="/NewOrders" element= {auth.authenticate? <Order /> : <Navigate to={`/signin`} />   } />
                <Route path="/employees"element = {auth.authenticate ? <Employees /> : <Navigate to={`/signin`} />   }  />
                <Route path="/Products"  element = {auth.authenticate ? <Customers /> : <Navigate to={`/signin`} />   } />

                {/* apps  */}
                <Route path="/kanban"   element = {auth.authenticate ? <Kanban /> : <Navigate to={`/signin`} />   }   />
                <Route path="/editor"  element = {auth.authenticate ? <Editor /> : <Navigate to={`/signin`} />   } />
                <Route path="/calendar"  element = {auth.authenticate ? <Calendar />  : <Navigate to={`/signin`} />   } />
                <Route path="/color-picker"   element = {auth.authenticate ? <ColorPicker /> : <Navigate to={`/signin`} />   }/>

                {/* charts  */}
                <Route path="/line"  element = {auth.authenticate ? <Line /> : <Navigate to={`/signin`} />   } />
                <Route path="/area"  element = {auth.authenticate ? <Area /> : <Navigate to={`/signin`} />   }/>
                <Route path="/bar"  element = {auth.authenticate ? <Bar /> : <Navigate to={`/signin`} />   } />
                <Route path="/pie"  element = {auth.authenticate ? <Pie /> : <Navigate to={`/signin`} />   } />
                <Route path="/financial"  element = {auth.authenticate ? <Financial /> : <Navigate to={`/signin`} />   } />
                <Route path="/color-mapping"  element = {auth.authenticate ? <ColorMapping /> : <Navigate to={`/signin`} />   } />
                <Route path="/pyramid"  element = {auth.authenticate ? <Pyramid /> : <Navigate to={`/signin`} />   } />
                <Route path="/stacked"  element = {auth.authenticate ? <Stacked /> : <Navigate to={`/signin`} />   } />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
