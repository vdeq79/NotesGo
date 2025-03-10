package todo

import (
	"github.com/vdeq79/NotesGo/pkg/entities"
	"gorm.io/gorm"
)

type Repository interface {
	GetTodos() (*[]entities.Todo, error)
	InsertTodo(title string, description string) (*entities.Todo, error)
	UpdateTodo(id string, title string, description string) (*entities.Todo, error)
	CompleteTodo(id string) (*entities.Todo, error)
	DeleteTodo(id string) error
}
type repository struct {
	db *gorm.DB
}

func NewRepo(db *gorm.DB) Repository {
	return &repository{db: db}
}


func (r *repository) GetTodos() (*[]entities.Todo, error) {
	var todos []entities.Todo
	result := r.db.Order("Id").Find(&todos)
	if result.Error != nil {
		return nil, result.Error
	}
	return &todos, nil
}

func (r *repository) InsertTodo(title string, description string) (*entities.Todo, error) {
	todo := entities.Todo{Title: title, Description: description}

	result := r.db.Create(&todo)
	if result.Error != nil {
		return nil, result.Error
	}
	return &todo, nil
}

func (r *repository) UpdateTodo(id string, title string, description string) (*entities.Todo, error) {
	var todo entities.Todo
	result := r.db.First(&todo, id)
	if result.Error != nil {
		return nil, result.Error
	}
	todo.Title = title
	todo.Description = description
	result = r.db.Save(&todo)

	if result.Error != nil {
		return nil, result.Error
	}
	return &todo, nil
}

func (r *repository) CompleteTodo(id string) (*entities.Todo, error) {
	var todo entities.Todo
	result := r.db.First(&todo, id)
	if result.Error != nil {
		return nil,result.Error
	}
	todo.Completed = true
	result = r.db.Save(&todo)
	if result.Error != nil {
		return nil, result.Error
	}
	return &todo, nil
}

func (r *repository) DeleteTodo(id string) error {
	var todo entities.Todo
	result := r.db.First(&todo, id)
	if result.Error != nil {
		return result.Error
	}
	result = r.db.Delete(&todo)
	if result.Error != nil {
		return result.Error
	}
	return nil
}