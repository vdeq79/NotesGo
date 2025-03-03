package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Todo struct {
	Id          uint   `gorm:"PrimaryKey" json:"id"`
	Completed   bool   `gorm:"default:false" json:"completed"`
	Identifier  string `gorm:"not null" json:"identifier"`
	Description string `json:"description"`
}

func main() {
	fmt.Println("Hello, World!")

	dsn := "postgres://postgres:password@db:5432/mydatabase"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	fmt.Println("Connected to database")

	db.AutoMigrate(&Todo{})

	fmt.Println("Database migrated")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
	}))

	// Define a route for the GET method on the root path '/'
	app.Get("/", func(c fiber.Ctx) error {
		// Send a string response to the client
		return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
	})

	app.Get("/api/todos", func(c fiber.Ctx) error {
		var todos []Todo
		result := db.Order("Id").Find(&todos)
		if result.Error != nil {
			log.Fatalf("Error fetching todos: %v", result.Error)
		}

		// Send a string response to the client
		return c.Status(200).JSON(todos)
	})

	app.Post("/api/todos", func(c fiber.Ctx) error {

		todoInfo := struct {
			Identifier  string `json:"identifier"`
			Description string `json:"description"`
		}{}

		if err := c.Bind().Body(&todoInfo); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}

		todo := Todo{
			Identifier:  todoInfo.Identifier,
			Description: todoInfo.Description,
		}

		result := db.Create(&todo)
		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
		}

		return c.Status(200).JSON(todo)
	})

	app.Patch("/api/todos/:id/complete", func(c fiber.Ctx) error {
		id := c.Params("id")
		var todo Todo
		result := db.First(&todo, id)
		if result.Error != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
		}

		todo.Completed = true
		db.Save(&todo)

		return c.Status(200).JSON(todo)

	})

	app.Patch("/api/todos/:id", func(c fiber.Ctx) error {
		id := c.Params("id")
		var todo Todo
		result := db.First(&todo, id)
		if result.Error != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
		}

		updatedTodo := new(Todo)
		if err := c.Bind().Body(updatedTodo); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}

		todo.Identifier = updatedTodo.Identifier
		todo.Description = updatedTodo.Description

		db.Save(&todo)

		return c.Status(200).JSON(todo)

	})

	app.Delete("/api/todos/:id", func(c fiber.Ctx) error {
		id := c.Params("id")
		var todo Todo
		result := db.First(&todo, id)
		if result.Error != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
		}

		db.Delete(&todo)

		return c.Status(200).JSON(fiber.Map{"message": "Todo deleted successfully"})
	})

	// Start the server on port 8080
	log.Fatal(app.Listen(":8080"))
}
