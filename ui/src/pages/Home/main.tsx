import { Flex } from "@chakra-ui/react";
import AddTodoButton from "./AddTodoButton";
import TodoListHeader from "./TodoListHeader";
import TodoList from "./TodoList";

export default function Home() {

    return(
        <>
            <TodoListHeader HeaderContent="Today's Tasks" />

            <Flex justify={"flex-end"} my={4}>
                <AddTodoButton />
            </Flex>

            <TodoList />
        </>
    )

}