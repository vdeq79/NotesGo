import { Container, Stack, Theme} from "@chakra-ui/react"
import TodoList from "./components/TodoList";
import EnhancedNavbar from "./components/EnhancedNavbar";
import { Toaster } from "@/components/ui/toaster"

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

function App() {

  return (
    <>
      <Theme>
        <Stack h="100vh">
          <EnhancedNavbar />
          <Container>
            <TodoList />
          </Container>
          <Toaster />
        </Stack>
      </Theme>
    </>
  )
}

export default App
