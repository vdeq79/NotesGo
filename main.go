package main

import (
	"fmt"
	"log"
	
	"github.com/vdeq79/NotesGo/pkg/todo"
	"github.com/vdeq79/NotesGo/api/routes"


	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	fmt.Println("Hello, World!")
	
	dsn := "postgres://postgres:password@db:5432/mydatabase"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	fmt.Println("Connected to database")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
	}))

	todoRepository := todo.NewRepo(db)
	todoService := todo.NewService(todoRepository)
	routes.TodoRoutes(app, todoService)

	// Start the server on port 8080
	log.Fatal(app.Listen(":8080"))
}
