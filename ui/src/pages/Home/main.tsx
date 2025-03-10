import { Flex } from "@chakra-ui/react";
import AddTodoButton from "./AddTodoButton";
import TodoListHeader from "./TodoListHeader";
import TodoList from "./TodoList";

const Home = () => {

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

export default Home;