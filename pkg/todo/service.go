package todo

import (
	"github.com/vdeq79/NotesGo/pkg/entities"
)

type Service interface {
	GetTodos() (*[]entities.Todo, error)
	InsertTodo(title string, description string) (*entities.Todo, error)
	UpdateTodo(id string, title string, description string) (*entities.Todo, error)
	CompleteTodo(id string) (*entities.Todo, error)
	DeleteTodo(id string) error
}

type service struct {
	repository Repository
}

func NewService(repository Repository) Service {
	return &service{repository: repository}
}

func (s *service) GetTodos() (*[]entities.Todo, error) {
	return s.repository.GetTodos()
}

func (s *service) InsertTodo(title string, description string) (*entities.Todo, error) {
	return s.repository.InsertTodo(title, description)
}

func (s *service) UpdateTodo(id string, title string, description string) (*entities.Todo, error) {
	return s.repository.UpdateTodo(id, title, description)
}

func (s *service) CompleteTodo(id string) (*entities.Todo, error) {
	return s.repository.CompleteTodo(id)
}

func (s *service) DeleteTodo(id string) error {
	return s.repository.DeleteTodo(id)
}