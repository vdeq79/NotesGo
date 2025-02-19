import {
	Button,
	Input,
	DialogRootProvider, 
	useDialog,
	Field,
	DialogActionTrigger
  } from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import { toaster } from "@/components/ui/toaster"


// Function to create Todo
const createTodo = async (body: string) => {
	const response = await fetch(BASE_URL + "/todos", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify(body),
	});
  
	if (!response.ok) {
	  throw new Error("Failed to create todo");
	}
  
	return response.json();
  };
  
  function CreateTodoButton() {
	const dialog = useDialog();
	const queryClient = useQueryClient();
	const [body, setBody] = useState("");
  
	// React Query Mutation
	const mutation = useMutation({
	  mutationFn: createTodo,
	  onSuccess: () => {
		toaster.create({ description: "Todo created!", type: "success", duration: 3000 });
		queryClient.invalidateQueries({ queryKey: ["todos"] }); // Refresh Todo list
		setBody("");
	  },
	  onError: () => {
		toaster.create({ title: "Error creating Todo", type: "error", duration: 3000 });
	  },
	});
  
	return (
	  <>
		<DialogRootProvider value={dialog}>
			<DialogTrigger asChild>
				<Button colorScheme="blue">
					Create Todo
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Todo</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Field.Root required>
						<Field.Label>
							Description
							<Field.RequiredIndicator />
						</Field.Label>
						<Input placeholder="Enter description" onChange={(e) => setBody(e.target.value)}/>
					</Field.Root>
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline">Cancel</Button>
					</DialogActionTrigger>
					<DialogActionTrigger asChild>
						<Button onClick={() => mutation.mutate(body)}>
							Save
						</Button>
					</DialogActionTrigger>
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
		</DialogRootProvider>
	  </>
	);
  }
  
  export default CreateTodoButton;