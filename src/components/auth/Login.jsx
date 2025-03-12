import { useEffect, useState } from "react";
import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { loginAPI, verifyTokenAPI } from "../../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        try {
          const response = await verifyTokenAPI(accessToken); // Call the verify token API

          // If the response is successful, navigate to the dashboard
          if (response.status === 200 && response.data.message === "Token is valid") {
            navigate("/dashboard");
          }
        } catch (error) {
          // Token verification failed, user is not logged in
          console.log("No valid session found.");
        }
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await loginAPI(username, password); // ✅ Calls API function

      // ✅ Stores tokens manually
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      toast({
        title: "Login Successful!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="6" boxShadow="md" borderRadius="lg">
      <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="4">Login</Text>
      <Stack spacing="4">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      </Stack>
    </Box>
  );
}

export default Login;
