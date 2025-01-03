package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v3"
)

type Todo struct {
	Id        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {
	fmt.Println("Hello, World!")

	app := fiber.New()

	todos := []Todo{
		{Id: 1, Completed: false, Body: "Learn Go"},
		{Id: 2, Completed: false, Body: "Learn React"},
		{Id: 3, Completed: false, Body: "Learn Fiber"},
		{Id: 4, Completed: true, Body: "Learn C#"},
	}

	// Define a route for the GET method on the root path '/'
	app.Get("/", func(c fiber.Ctx) error {
		// Send a string response to the client
		return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
	})

	app.Get("/api/todos", func(c fiber.Ctx) error {
		// Send a string response to the client
		return c.Status(200).JSON(fiber.Map{"todos": todos})
	})

	// Start the server on port 4000
	log.Fatal(app.Listen(":4000"))
}
