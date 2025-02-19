import { Container, Flex, Spinner, Stack, Text } from "@chakra-ui/react";

import TodoItem, { Todo } from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import CreateTodoButton from "./CreateTodoButton";


const TodoList = () => {
	const { data: todos, isLoading } = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: async () => {
			try {
				const res = await fetch(BASE_URL + "/todos");
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data.todos || [];
			} catch (error) {
				console.log(error);
			}
		},
	});

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
				Today's Tasks
			</Text>
			<Flex justifyContent={"right"} my={4}>
            	<CreateTodoButton />
			</Flex>
            <Container maxW={"900px"}>
                {isLoading && (
                    <Flex justifyContent={"center"} my={4}>
                        <Spinner size={"xl"} />
                    </Flex>
                )}
                {!isLoading && todos?.length === 0 && (
                    <Stack alignItems={"center"} gap='3'>
                        <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
                            All tasks completed! 🤞
                        </Text>
                    </Stack>
                )}
                {todos?.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />                    
                ))}
            </Container>
		</>
	);
};
export default TodoList;