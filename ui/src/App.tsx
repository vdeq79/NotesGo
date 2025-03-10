import { Container, Stack, Theme } from "@chakra-ui/react"
import EnhancedNavbar from "./components/EnhancedNavbar";
import { Toaster } from "@/components/ui/toaster"
import Home from "./pages/Home/main";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

export default function App() {

    return (
        <>
            <Theme>
                <Stack h="100vh">
                    <EnhancedNavbar />
                    <Container>
                        <Home />
                        <Toaster />
                    </Container>
                </Stack>
            </Theme>
        </>
    )
}
