package routes

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vdeq79/NotesGo/api/handlers"
	"github.com/vdeq79/NotesGo/pkg/todo"
)

func TodoRoutes(app *fiber.App, service todo.Service) {
	const prefix = "/api/todos"

	app.Get(prefix, handlers.GetTodos(service))
	app.Post(prefix, handlers.InsertTodo(service))
	app.Patch(prefix+"/:id/complete", handlers.CompleteTodo(service))
	app.Patch(prefix+"/:id", handlers.UpdateTodo(service))
	app.Delete(prefix+"/:id", handlers.DeleteTodo(service))
}