import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthRoute } from './useContext/auth';
import {Menu} from './Menu';
import {HomePage} from "./HomePage";
import {BlogPage} from "./BlogPage";
import {ProfilePage} from "./ProfilePage";
import {NotFound} from "./NotFound";
import {BlogPost} from './BlogPost';
import {LoginPage} from './LoginPage';
import { RegisterPage } from "./RegisterPage";
import {LogoutPage} from './LogoutPage';
import './App.css';



function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu/>
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              
              <Route               
                path='/blog' element={<BlogPage />} >
                  <Route 
                    path=':slug' 
                    element={
                        <AuthRoute>
                          <BlogPost />
                        </AuthRoute>
                      } 
                    />
              </Route>            
              
              <Route
                path='/profile/:username' 
                element={
                  <AuthRoute>
                    <ProfilePage />
                  </AuthRoute>
                } />                
              
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              
              <Route 
                path='/logout' 
                element={
                  <AuthRoute>
                    <LogoutPage />
                  </AuthRoute>
                } 
                />


              <Route path='*' element={<NotFound/>} />
            </Routes>
          </main>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
