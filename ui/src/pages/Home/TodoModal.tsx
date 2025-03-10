import { Button, Field, Input, Textarea } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "@/components/ui/dialog"
import React, { useState } from "react";

interface TodoModalProps {
  modelTrigger:  () => React.JSX.Element;
  saveButton: () => React.JSX.Element;
  initialTitle?: string;
  initialDescription?: string;
  handleFormSubmit: (e: React.FormEvent<HTMLElement>, title: any, description: any) => void
}


const TodoModal = ({props}: {props: TodoModalProps}) => {

	const [open, setOpen] = useState(false);

	const initialTodoInfo = {title: props.initialTitle ?? "", description: props.initialDescription ?? ""};

	const [todoInfo, setTodoInfo] = useState({
		title: initialTodoInfo.title, 
		description: initialTodoInfo.description,
	});


	return (
		<DialogRoot open={open} onOpenChange={(e)=> setOpen(e.open)} onExitComplete={() => setTodoInfo(initialTodoInfo)} trapFocus={false}> 
			<DialogTrigger asChild>
				{props.modelTrigger()}
			</DialogTrigger>
			<DialogContent as="form" onSubmit={(e) => props.handleFormSubmit(e, todoInfo.title, todoInfo.description)}>
				<DialogHeader>
					<DialogTitle>Todo</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Field.Root required>
						<Field.Label>
							Title
						<Field.RequiredIndicator />
						</Field.Label>
						<Input value={todoInfo.title} onChange={(e) => setTodoInfo({...todoInfo, title: e.target.value})} />
					</Field.Root>

					<Field.Root>
						<Field.Label>
							Description
						<Field.RequiredIndicator />
						</Field.Label>
						<Textarea rows={4} value={todoInfo.description} onChange={(e) => setTodoInfo({...todoInfo, description: e.target.value})} />
					</Field.Root>
				</DialogBody>

				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline">Cancel</Button>
					</DialogActionTrigger>					
					<DialogActionTrigger asChild>
						{props.saveButton()}
					</DialogActionTrigger>
				</DialogFooter>
				<DialogCloseTrigger/>
			</DialogContent>
		</DialogRoot>
	);
}

export default TodoModal;