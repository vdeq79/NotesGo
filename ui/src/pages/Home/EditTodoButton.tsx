import { QueryClient, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/App";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, IconButton, Spinner } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { FaEdit } from "react-icons/fa";
import TodoModal from "./TodoModal";
import Todo from "@/types/Todo";

export default function EditTodoButton( todo: Todo, queryClient: QueryClient ) {

	const { mutate: editTodo, isPending: isEditing } = useMutation({
		mutationKey: ["editTodo"],
		mutationFn: async ({identifier, description}: {identifier: string, description: string}) => {
			try {
				todo.identifier = identifier;
				todo.description = description;

				const res = await fetch(BASE_URL + `/todos/${todo.id}`, {
					method: "PATCH",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(todo)
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
		onSuccess: (data) => {
			queryClient.setQueryData(["todos"], (old: Todo[]) => old.map((t) => t.id === todo.id ? data : t));
			toaster.create({
				title: "Todo edited!",
				type: "success",
				duration: 3000
			})
		},
	});



	function handleFormSubmit(e: React.FormEvent<HTMLElement>, identifier: string, description: string){
		e.preventDefault();
		editTodo({identifier, description});
	}



	function modelTrigger(){
		return(
			<IconButton color={"yellow.500"} variant={"plain"} size={"lg"} disabled={todo.completed}>
				<Tooltip content = "Edit Todo" openDelay={200} closeDelay={200}>
					<Box>
						{!isEditing && <FaEdit/>}
						{isEditing && <Spinner/>} 
					</Box>
				</Tooltip>
			</IconButton>
		);
	}

	function saveButton(){
		return(
			<Button type="submit" colorScheme="blue" mr={3}>
            	Save
            </Button>
		);
	}


	return (
		TodoModal({
			props: {
				modelTrigger: modelTrigger(),
				initialDescription: todo.description,
				initialIdentifier: todo.identifier,
				saveButton: saveButton,
				handleFormSubmit: handleFormSubmit
			}
		})
	);
}