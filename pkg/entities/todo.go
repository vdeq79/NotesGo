package entities

type Todo struct {
	Id          uint   `gorm:"PrimaryKey" json:"id"`
	Completed   bool   `gorm:"default:false" json:"completed"`
	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`
}

type TodoInfo struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}