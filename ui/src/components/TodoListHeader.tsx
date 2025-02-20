import { Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";



export default function TodoListHeader({HeaderContent}: {HeaderContent: string}) {

	return (
		<>
			<Text
				fontSize={"4xl"}
				textTransform={"uppercase"}
				fontWeight={"bold"}
				textAlign={"center"}
				my={2}
                bgGradient='to-l'
                gradientFrom={useColorModeValue("#0b85f8", "#ff0051")}
                gradientTo={useColorModeValue("#00ffff", "#ffe600")}
				bgClip='text'
			>
				{HeaderContent}
			</Text>
		</>
	);
};
