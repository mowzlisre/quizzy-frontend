import { useState } from 'react';
import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Sandbox from './components/Sandbox';
import NewAssessment from './components/NewAssessment';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [project, setProject] = useState(null);
  const bg = useColorModeValue('gray.50','gray.900');
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const selectProject = (proj) => setProject(proj === 'new' ? null : proj);
  return (
    <BrowserRouter>
      <Flex direction="column" height="100vh" bg={bg}>
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <Flex flex="1" overflow="hidden">
          <Sidebar sidebarOpen={sidebarOpen} selectProject={selectProject} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/id" element={<Sandbox project={project} />} />
            <Route path="/id/new" element={<NewAssessment />} />
          </Routes>
        </Flex>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
