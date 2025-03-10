import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/App";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@chakra-ui/react";
import TodoModal from "./TodoModal";
import React from "react";
import Todo from "@/types/Todo";

const AddTodoButton = () => {

	const queryClient = useQueryClient();

	const { mutate: addTodo } = useMutation({
		mutationKey: ["addTodo"],
		mutationFn: async ({title, description}: {title: string, description: string}) => {
			try {

				const res = await fetch(BASE_URL + `/todos`, {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({title: title, description: description})
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
			queryClient.setQueryData(["todos"], (old: Todo[]) => [...old, data]);
			toaster.create({
				title: "Todo Added!",
				type: "success",
				duration: 3000
			})
		},
	});



	function handleFormSubmit(e: React.FormEvent<HTMLElement>, title: string, description: string){
		e.preventDefault();
		addTodo({title, description});
	}



	function modelTrigger(){
		return(
			<Button colorPalette={"teal"} variant={"surface"} size={"lg"}>
				Add Todo
			</Button>
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
				modelTrigger: modelTrigger,
				saveButton: saveButton,
				handleFormSubmit: handleFormSubmit
			}
		})
	);
}

export default AddTodoButton;