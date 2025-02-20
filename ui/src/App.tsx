import { Container, Stack, Theme } from "@chakra-ui/react"
import TodoList from "./components/TodoList";
import EnhancedNavbar from "./components/EnhancedNavbar";
import TodoListHeader from "./components/TodoListHeader";
import { Toaster } from "@/components/ui/toaster"

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

function App() {

  return (
    <>
      <Theme>
        <Stack h="100vh">
          <EnhancedNavbar />
          <Container>
            <TodoListHeader HeaderContent="Today's Tasks" />
            <TodoList />
            <Toaster />
          </Container>
        </Stack>
      </Theme>
    </>
  )
}

export default App
