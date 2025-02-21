import { Button, DialogRootProvider, Field, Input, useDialog } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react";

interface TodoModalProps {
  modelTrigger:  React.JSX.Element;
  saveButton: (identifier: string, description: string) => React.JSX.Element;
  initialIdentifier?: string;
  initialDescription?: string;
}


const TodoModal = ({props}: {props: TodoModalProps}) => {

	const [identifier, setIdentifier] = useState(props.initialIdentifier ?? "");
	const [description, setDescription] = useState(props.initialDescription ?? "");
	const dialog = useDialog();

	return (
		<DialogRootProvider value={dialog}> 

			<DialogTrigger asChild>
				{props.modelTrigger}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Todo</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Field.Root required>
						<Field.Label>
							Identifier
						<Field.RequiredIndicator />
						</Field.Label>
						<Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
					</Field.Root>

					<Field.Root>
						<Field.Label>
							Description
						<Field.RequiredIndicator />
						</Field.Label>
						<Input value={description} onChange={(e) => setDescription(e.target.value)} />
					</Field.Root>
				</DialogBody>

				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline" onClick={() => {
							setIdentifier(props.initialIdentifier ?? ""); 
							setDescription(props.initialDescription ?? "")}}>
								Cancel
						</Button>
					</DialogActionTrigger>					
					<DialogActionTrigger asChild>
						{props.saveButton(identifier, description)}
					</DialogActionTrigger>
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
		</DialogRootProvider>
	);
}

export default TodoModal;