import { Button, Field, Input } from "@chakra-ui/react"
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
  modelTrigger:  React.JSX.Element;
  saveButton: () => React.JSX.Element;
  initialIdentifier?: string;
  initialDescription?: string;
  handleFormSubmit: (e: React.FormEvent<HTMLElement>, identifier: any, description: any) => void
}


const TodoModal = ({props}: {props: TodoModalProps}) => {

	const [open, setOpen] = useState(false);

	const initialTodoInfo = {identifier: props.initialIdentifier ?? "", description: props.initialDescription ?? ""};

	const [todoInfo, setTodoInfo] = React.useState({
		identifier: initialTodoInfo.identifier, 
		description: initialTodoInfo.description,
	});


	return (
		<DialogRoot open={open} onOpenChange={(e)=> setOpen(e.open)} onExitComplete={() => setTodoInfo(initialTodoInfo)} trapFocus={false}> 
			<DialogTrigger asChild>
				{props.modelTrigger}
			</DialogTrigger>
			<DialogContent as="form" onSubmit={(e) => props.handleFormSubmit(e, todoInfo.identifier, todoInfo.description)}>
				<DialogHeader>
					<DialogTitle>Todo</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Field.Root required>
						<Field.Label>
							Identifier
						<Field.RequiredIndicator />
						</Field.Label>
						<Input value={todoInfo.identifier} onChange={(e) => setTodoInfo({...todoInfo, identifier: e.target.value})} />
					</Field.Root>

					<Field.Root>
						<Field.Label>
							Description
						<Field.RequiredIndicator />
						</Field.Label>
						<Input value={todoInfo.description} onChange={(e) => setTodoInfo({...todoInfo, description: e.target.value})} />
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