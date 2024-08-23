import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdatedProfile } from './_root/pages'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <GoogleOAuthProvider clientId="430336406816-64of42nqlcq0kpqcknfnbf77or4umn9n.apps.googleusercontent.com">
      <main className='flex h-screen '>
          <Routes>
              {/* public routes */}
              <Route element={<AuthLayout/>}>
                  <Route path='/sign-in' element={<SigninForm />} />
                  <Route path='/sign-up' element={<SignupForm />} />
              </Route>

              {/* private routes */}
              <Route element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path='/explore' element={<Explore />}></Route>
                  <Route path='/saved' element={<Saved />}></Route>
                  <Route path='/all-users' element={<AllUsers />}></Route>
                  <Route path='/create-post' element={<CreatePost />}></Route>
                  <Route path='/update-post/:id' element={<EditPost />}></Route>
                  <Route path='/posts/:id' element={<PostDetails />}></Route>
                  <Route path='/profile/:id/*' element={<Profile />}></Route>
                  <Route path='/update-profile/:id' element={<UpdatedProfile />}></Route>
              </Route>
          </Routes>

          <Toaster />
      </main>
    </GoogleOAuthProvider>
  )
}

export default App