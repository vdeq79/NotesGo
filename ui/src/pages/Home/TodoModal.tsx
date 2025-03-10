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
import { Controller, useForm } from "react-hook-form";

interface TodoModalProps {
  modelTrigger:  () => React.JSX.Element;
  saveButton: () => React.JSX.Element;
  initialTitle?: string;
  initialDescription?: string;
  handleFormSubmit: (title: any, description: any) => void
}

interface todoInfo {
	title: string;
	description: string;
}


const TodoModal = ({props}: {props: TodoModalProps}) => {

	const [open, setOpen] = useState(false);

	const initialTodoInfo: todoInfo = {title: props.initialTitle ?? "", description: props.initialDescription ?? ""};
	const {handleSubmit, reset, control, formState: {errors} } = useForm<todoInfo>();

	return (
		<DialogRoot open={open} onOpenChange={(e)=> setOpen(e.open)} onExitComplete={() => reset({title: initialTodoInfo.title, description: initialTodoInfo.description})} trapFocus={false}> 
			<DialogTrigger asChild>
				{props.modelTrigger()}
			</DialogTrigger>
			<DialogContent as="form" onSubmit={handleSubmit((data) => {
				props.handleFormSubmit(data.title, data.description); 
				setOpen(false);
			})}>
				<DialogHeader>
					<DialogTitle>Todo</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Field.Root required invalid={errors.title ? true : false}>
						<Field.Label>
							Title
						<Field.RequiredIndicator />
						</Field.Label>
						<Controller
							name="title"
							control={control}
							rules={{ validate: (value) => value && value.trim().length > 0 }}
							render={({ field }) => (
								<Input {...field} aria-invalid={errors.title ? true : false}/>
							)}
							defaultValue={initialTodoInfo.title}
							
						/>
						<Field.ErrorText>Title is required and cannot be empty</Field.ErrorText>
					</Field.Root>

					<Field.Root>
						<Field.Label>
							Description
						<Field.RequiredIndicator />
						</Field.Label>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<Textarea rows={4} {...field} />
							)}
							defaultValue={initialTodoInfo.description}
						/>
					</Field.Root>
				</DialogBody>

				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline">Cancel</Button>
					</DialogActionTrigger>					
					{props.saveButton()}
				</DialogFooter>
				<DialogCloseTrigger/>
			</DialogContent>
		</DialogRoot>
	);
}

export default TodoModal;