import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Buy eggs', completed: true },
  { id: 3, text: 'Buy bread', completed: false }
]

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos)
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

    const todo = todos.find(todo => todo.id === id)

    if (!todo) return res.status(404).json({ error: 'Todo not found' })

    return res.json(todo)
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body

    if (!text)
      return res.status(400).json({ error: 'Property text is required' })

    const newTodo = {
      id: todos.length + 1,
      text,
      completed: false
    }

    todos.push(newTodo)

    return res.status(201).json(newTodo)
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

    const todo = todos.find(todo => todo.id === id)
    if (!todo) return res.status(404).json({ error: 'Todo not found' })

    const { text, completed } = req.body

    todo.text = text || todo.text
    todo.completed = completed || todo.completed

    return res.json(todo)
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

    const todo = todos.find(todo => todo.id === id)
    if (!todo) return res.status(404).json({ error: 'Todo not found' })

    const index = todos.indexOf(todo)
    todos.splice(index, 1)

    return res.status(204).send()
  }
}
