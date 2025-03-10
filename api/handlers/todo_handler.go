package handlers

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vdeq79/NotesGo/pkg/todo"
	"github.com/vdeq79/NotesGo/pkg/entities"
)

func GetTodos(service todo.Service) fiber.Handler {
	return func(c fiber.Ctx) error {
		todos, err := service.GetTodos()
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Status(200).JSON(todos)
	}
}

func InsertTodo(service todo.Service) fiber.Handler {
	return func(c fiber.Ctx) error {
		var todoInfo entities.TodoInfo

		if err := c.Bind().Body(&todoInfo); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		todo, err := service.InsertTodo(todoInfo.Title, todoInfo.Description)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Status(200).JSON(todo)
	}
}

func UpdateTodo(service todo.Service) fiber.Handler {
	return func(c fiber.Ctx) error {
		var todoInfo entities.TodoInfo
		id := c.Params("id")
		if err := c.Bind().Body(&todoInfo); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		todo, err := service.UpdateTodo(id, todoInfo.Title, todoInfo.Description)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Status(200).JSON(todo)
	}
}

func CompleteTodo(service todo.Service) fiber.Handler {
	return func(c fiber.Ctx) error {
		id := c.Params("id")
		todo, err := service.CompleteTodo(id)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Status(200).JSON(todo)
	}
}

func DeleteTodo(service todo.Service) fiber.Handler {
	return func(c fiber.Ctx) error {
		id := c.Params("id")
		err := service.DeleteTodo(id)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Status(200).JSON(fiber.Map{"message": "Todo deleted successfully"})
	}
}