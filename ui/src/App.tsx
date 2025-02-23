import { Container, Flex, Stack, Theme } from "@chakra-ui/react"
import TodoList from "./components/TodoList";
import EnhancedNavbar from "./components/EnhancedNavbar";
import TodoListHeader from "./components/TodoListHeader";
import { Toaster } from "@/components/ui/toaster"
import AddTodoButton from "./components/AddTodoButton";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

function App() {

return (
    <>
        <Theme>
            <Stack h="100vh">
                <EnhancedNavbar />
                <Container>

                    <TodoListHeader HeaderContent="Today's Tasks" />

                    <Flex justify={"flex-end"} my={4}>
                        <AddTodoButton/>
                    </Flex>

                    <TodoList />

                    <Toaster />

                </Container>
            </Stack>
        </Theme>
    </>
)
}

export default App
