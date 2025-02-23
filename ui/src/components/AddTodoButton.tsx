import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/App";
import { toaster } from "./ui/toaster";
import { Button } from "@chakra-ui/react";
import TodoModal from "./TodoModal";
import React from "react";
import { Todo } from "./TodoItem";

const AddTodoButton = (
	props: {
		addTodofn: (todo: Todo) => void
	}
) => {

	const { mutate: addTodo} = useMutation({
		mutationKey: ["addTodo"],
		mutationFn: async ({identifier, description}: {identifier: string, description: string}) => {
			try {

				const res = await fetch(BASE_URL + `/todos`, {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({identifier: identifier, description: description})
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				toaster.create({
					title: "Todo Added!",
					type: "success",
					duration: 3000
				})

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: (data) => {
			props.addTodofn(data);
		},
	});



	function handleFormSubmit(e: React.FormEvent<HTMLElement>, identifier: string, description: string){
		e.preventDefault();
		addTodo({identifier, description});
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
				modelTrigger: modelTrigger(),
				saveButton: saveButton,
				handleFormSubmit: handleFormSubmit
			}
		})
	);
}

export default AddTodoButton;