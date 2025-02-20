import { Text } from "@chakra-ui/react";



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
                gradientFrom={"#0b85f8"}
                gradientTo={"#00ffff"}
				bgClip='text'
			>
				{HeaderContent}
			</Text>
		</>
	);
};
