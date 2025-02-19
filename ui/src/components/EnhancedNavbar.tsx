import {
	Box,
	Flex,
	Button,
	Text,
	Container,
	IconButton,
	HStack,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';

import { IoMoon, IoMenu, IoClose } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { useColorMode, useColorModeValue } from './ui/color-mode';



export default function EnhancedNavbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { open, onToggle } = useDisclosure();

	return (
		<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
			<Container maxW="container.xl">
				<Flex h={16} alignItems="center" justifyContent="space-between">

					{/* Mobile Menu */}
					<IconButton
						size="md"
						aria-label="Open Menu"
						display={{ md: 'none' }}
						onClick={onToggle}
					>
						{open ? <IoClose /> : <IoMenu />}
					</IconButton>

					{/* Logo or Brand Name */}
					<Text fontSize="2xl" fontWeight="bold">
						TodoL
					</Text>

					{/* Desktop Menu */}
					<HStack as="nav" display={{ base: 'none', md: 'flex' }}>
						<Button variant="ghost">Home</Button>
						<Button variant="ghost">About</Button>
						<Button variant="ghost">Services</Button>
						<Button variant="ghost">Contact</Button>
					</HStack>

					{/* Color Mode Toggle */}
					<Button onClick={toggleColorMode} ml={4}>
						{colorMode === 'light' ? <IoMoon /> : <LuSun />}
					</Button>
				</Flex>

				{/* Collapsible Content */}
				{open && (
				<VStack
					as="nav"
					display={{ md: 'none' }}
					alignItems="start"
				>
					<Button variant="ghost" w="full">
					Home
					</Button>
					<Button variant="ghost" w="full">
					About
					</Button>
					<Button variant="ghost" w="full">
					Services
					</Button>
					<Button variant="ghost" w="full">
					Contact
					</Button>
				</VStack>
				)}


			</Container>
		</Box>
	);
}
