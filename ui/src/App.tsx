import { Container, Stack, Theme } from "@chakra-ui/react"
import TodoList from "./components/TodoList";
import EnhancedNavbar from "./components/EnhancedNavbar";
import { Toaster } from "@/components/ui/toaster"
import { Canvas } from "@react-three/fiber";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

function App() {



return (
    <>
    <Canvas style={{ position: "fixed", width: "100%", height: "100%" }} camera={{ position: [0, 10, 10] }}>
        <axesHelper args={[20]}  />
        <gridHelper args={[20, 20]} />
        <mesh  position={[-11, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>
    </Canvas>
        <Theme>
            <Stack h="100vh">
                <EnhancedNavbar />
                <Container>
                    <TodoList />
                    <Toaster />
                </Container>
            </Stack>
    </Theme>
    </>
)
}

export default App
