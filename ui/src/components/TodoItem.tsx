import { Badge,  Box,  Card,  Flex,  HStack, IconButton,  Spinner,  Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { BASE_URL } from "../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { toaster } from "@/components/ui/toaster"
import { Tooltip } from "./ui/tooltip";
import EditTodoButton from "./EditTodoButton";

export type Todo = {
	id: number;
	identifier: string;
	description: string;
	completed: boolean;
};

const TodoItem = ({ todo }: { todo: Todo }) => {
	const queryClient = useQueryClient();

	const { mutate: completeTodo, isPending: isCompleting } = useMutation({
		mutationKey: ["completeTodo"],
		mutationFn: async () => {
			if (todo.completed){
				toaster.create({
					title: "Todo is already completed",
					type: "warning",
					duration: 3000
				})

				return;
			}
			try {
				const res = await fetch(BASE_URL + `/todos/${todo.id}/complete`, {
					method: "PATCH",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				toaster.create({
					title: "Todo completed!",
					type: "success",
					duration: 3000
				})

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
				const res = await fetch(BASE_URL + `/todos/${todo.id}`, {
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
			toaster.create({
				title: "Todo deleted",
				type: "success",
				duration: 3000
			})
		},
	});
    
	return (
		<Card.Root bg={useColorModeValue("white", "gray.800")} variant={"elevated"} width={"100%"} transition={"all 0.3s ease-in-out"} _hover={{ transform: "scale(1.03)" }}>
			<Card.Body gap={"2"}>
				<Card.Title>
					<Flex flex={1}>
						<Text color={todo.completed ? "green.400" : "yellow.400"} fontSize={"xl"} textDecoration={todo.completed ? "line-through" : "none"}>
							{todo.identifier}
						</Text>
						
						<Flex ml={"auto"} alignItems={"center"}>
							<Box marginRight={5} boxSize={"fit-content"}>
								{todo.completed && (
									<Badge size={"md"} colorPalette='green' variant={"surface"}>
										Done
									</Badge>
								)}
								{!todo.completed && (
									<Badge  size={"md"} colorPalette='yellow' variant={"surface"}>
										In Progress
									</Badge>
								)}
							</Box>

							<HStack spaceX={-2}>
								<EditTodoButton todo={todo}/>

								<IconButton color={"green.500"} onClick={() => completeTodo()} size={"lg"} variant={"plain"}>
									<Tooltip content = "Complete Todo" openDelay={200} closeDelay={200}>
										<Box >
											{!isCompleting && <FaCheckCircle/>}
											{isCompleting && <Spinner/>}
										</Box>
									</Tooltip>
								</IconButton>

								<IconButton color={"red.500"} onClick={() => deleteTodo()} size={"lg"} variant={"plain"}>
									<Tooltip content = "Delete Todo" openDelay={200} closeDelay={200}>
										<Box>
											{!isDeleting && <MdDelete/>}
											{isDeleting && <Spinner/>}
										</Box>
									</Tooltip>
								</IconButton>
							</HStack>

						</Flex>

					</Flex> 
				</Card.Title>
				<Card.Description>
					{todo.description}
				</Card.Description>

			</Card.Body>
		</Card.Root>
	);
};

export default TodoItem;