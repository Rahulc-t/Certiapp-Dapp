import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import IssuePage from './pages/IssuePage'
import ViewPage from './pages/ViewPage'


function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/issue" element={<IssuePage/>}/>
      <Route path="/view/:id" element={<ViewPage/>}/>


    </Route>
    </>
  ))
  return (

    <>
    <RouterProvider router={router}/>
   </>
    
  )
}

export default App
