import {  useState } from "react"
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";


function App() {

  const [darkMode, setDarkMode] = useState(false);
  const palletType= darkMode ? 'dark' : 'light';
  const theme = createTheme({
        palette:{
          mode:palletType,
          background:{
            default: (palletType === 'light') ? 
                'radial-gradient(circle,#1e3aBa,#111B27)' : 'radial-gradient(circle,#baecf9,#f0f9ff)',
                
          }
        }
  })

const toggleDarkMode = () =>{
  setDarkMode(!darkMode);
}


  

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    <Box sx={{
      minHeight:'100vh', background: darkMode ?  
      'radial-gradient(circle,#1e3aBa,#111B27)' : 'radial-gradient(circle,#baecf9,#f0f9ff)',
      py:6
    }}>
      <Container maxWidth='xl' sx={{mt:8}}>
        <Outlet />
      </Container>   
      </Box>   
      </ThemeProvider>      
   
  )
}

export default App
