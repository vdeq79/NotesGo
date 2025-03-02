import { Container, Stack, Theme } from "@chakra-ui/react"
import EnhancedNavbar from "./components/EnhancedNavbar";
import { Toaster } from "@/components/ui/toaster"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MobileBox from "./components/MobileBox";
import Home from "./pages/Home/main";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

function App() {

    return (
        <>
        {/* <Canvas style={{ position: "fixed", width: "100%", height: "100%" }} camera={{ position: [0, 10, 10] }}>
            <OrbitControls />
            <axesHelper args={[20]}  />
            <gridHelper args={[20, 20]} />
            <MobileBox position={[-10.5, 0, 0]} depth={2}/>
        </Canvas> */}
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

export default App
