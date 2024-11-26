import { Container, Stack, Theme } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import TodoList from "./components/TodoList";
import { useColorModeValue } from "./components/ui/color-mode";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";

function App() {

  return (
    <>
      <Theme background={useColorModeValue("pink.50", "blue.900")}>
        <Stack h="100vh">
          <Navbar />
          <Container>
            <TodoList />
          </Container>
        </Stack>
      </Theme>
    </>
  )
}

export default App
