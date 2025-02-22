import { useState } from 'react';
import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Sandbox from './components/Sandbox';
import NewAssessment from './components/NewAssessment';
import Login from './components/auth/Login';

function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [project, setProject] = useState(null);
  const bg = useColorModeValue('gray.50', 'gray.900');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const selectProject = (proj) => setProject(proj === 'new' ? null : proj);

  return (
    <Flex direction="column" height="100vh" bg={bg}>
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Flex flex="1" overflow="hidden">
        <Sidebar sidebarOpen={sidebarOpen} selectProject={selectProject} />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="p/*" element={<Sandbox project={project} />} />
          <Route path="id/new" element={<NewAssessment />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
