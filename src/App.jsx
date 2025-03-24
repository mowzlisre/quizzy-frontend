import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import NewAssessment from './components/NewAssessment';
import Sandbox from './components/Sandbox';
import Sidebar from './components/Sidebar';
import Login from './components/auth/Login';
import CreateProject from './components/CreateProject';
import NewAttempt from './components/Assessment/NewAttempt';

function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bg = useColorModeValue('gray.50', 'gray.900');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Flex direction="column" height="100vh" bg={bg}>
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Flex flex="1" overflow="hidden">
        <Sidebar sidebarOpen={sidebarOpen}/>
        <Routes>
          <Route path="new" element={<CreateProject />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path=":type/:uuid" element={<Sandbox />} />
          <Route path="a/new/:uuid" element={<NewAssessment />} />
          <Route path="*" element={<Navigate to="/app/dashboard" />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/*" element={<Layout />} />

        {/* Redirect root to /app/dashboard */}
        <Route path="*" element={<Navigate to="/app/dashboard" />} />
        <Route path="/n/:uuid" element={<NewAttempt/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
