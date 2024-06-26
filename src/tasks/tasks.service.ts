import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './tasks.model'
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  // Open-Closed principle: Open for extension, closed for modification 
  // tasks não pode ser alterado por componentes externos
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
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
