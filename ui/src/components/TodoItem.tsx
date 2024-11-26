import { Badge,  Box,  Flex,  Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";


export type Todo = {
	id: number;
	body: string;
	completed: boolean;
};

const TodoItem = ({ todo }: { todo: Todo }) => {
	/*const queryClient = useQueryClient();

	const { mutate: updateTodo, isPending: isUpdating } = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: async () => {
			if (todo.completed) return alert("Todo is already completed");
			try {
				const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
					method: "PATCH",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: async () => {
			try {
				const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
					method: "DELETE",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});
    */

	return (
        <Box bg={useColorModeValue("gray.400", "gray.700")} px={2} my={3} borderRadius={"0.7rem"}>

                <Flex
                    flex={1}
                    alignItems={"center"}
                    p={2}
                    justifyContent={"space-between"}
                >

                    <Text
                        color={todo.completed ? "green.200" : "yellow.200"}
                        textDecoration={todo.completed ? "line-through" : "none"}
                    >
                        {todo.body}
                    </Text>
                    {todo.completed && (
                        <Badge colorPalette='green'>
                            Done
                        </Badge>
                    )}
                    {!todo.completed && (
                        <Badge colorPalette='yellow'>
                            In Progress
                        </Badge>
                    )}
                </Flex>
                {/* <Flex gap={2} alignItems={"center"}>
                    <Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
                        {!isUpdating && <FaCheckCircle size={20} />}
                        {isUpdating && <Spinner size={"sm"} />}
                    </Box>
                    <Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
                        {!isDeleting && <MdDelete size={25} />}
                        {isDeleting && <Spinner size={"sm"} />}
                    </Box>
                </Flex> */}

        </Box>
	);
};

export default TodoItem;