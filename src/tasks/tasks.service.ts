import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './tasks.model'
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'

@Injectable()
export class TasksService {
  // Open-Closed principle: Open for extension, closed for modification 
  // tasks não pode ser alterado por componentes externos
  private tasks: Task[] = [
    {
      "id": "3aeba68b-5f07-4bdd-8df9-b133762d4f85",
      "title": "NestJS",
      "description": "Progressive JS Framework",
      "status": TaskStatus.OPEN
    },
    {
      "id": "1eac906c-f007-47d3-86d5-fb82e125a09d",
      "title": "Coffee",
      "description": "Fuel for coders",
      "status": TaskStatus.IN_PROGRESS
    },
    {
      "id": "c3c42008-d3e0-4a91-9559-eb7e18aa7f9d",
      "title": "Javascript",
      "description": "base language",
      "status": TaskStatus.DONE
    }
  ]

  getAllTasks(): Task[] {
    return this.tasks
  }

  getFilteredTask(status: TaskStatus): Task[] {
    let tasks = this.getAllTasks()

    if (status) {
      tasks = tasks.filter(task => task.status === status)
      console.log('Status: ', status)
      console.log('Status filterDTO: ', status)
    }

    console.log('Status: ', status)
    return tasks
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id)

    if (!found) {
      throw new NotFoundException(`Task with the ID "${id}" not found`)
    }

    return found
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== found.id)
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {

    const targetTask = this.getTaskById(id)

    targetTask.status = status

    console.log('Target Task : ', targetTask)

    return targetTask
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {

    const { title, description } = createTaskDTO

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task

    //quando criamos um recurso numa RestAPI, é de boa prática retorná-lo na função
    //isso é ótimo para o dev frontend, pois:
    // 1- Reduz o load do app
    // 2- Quando o objeto é exibido p/ o usuário na tela, não é necessário fazer uma nova requisição
  }
}
