import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/App";
import Todo from "@/types/Todo";


const TodoList = () => {

	const { data: todos, isPending } = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: async () => {
			try {
				const res = await fetch(BASE_URL + "/todos");
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data || [];
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<>
			<VStack maxWidth={"900px"} mx={"auto"} gapY={4}>
                {isPending && (
                    <Flex justifyContent={"center"} my={4}>
                        <Spinner size={"xl"} />
                    </Flex>
                )}
                {!isPending && todos?.length === 0 && (
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						All tasks completed! 🤞
					</Text>
                )}
                {todos?.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />                    
                ))}
			</VStack>
		</>
	);
};

export default TodoList;