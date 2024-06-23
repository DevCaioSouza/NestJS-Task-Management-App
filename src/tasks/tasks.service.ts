import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './tasks.model'
import * as uuid from 'uuid'

@Injectable()
export class TasksService {
  // Open-Closed principle: Open for extension, closed for modification 
  // tasks não pode ser alterado por componentes externos
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  createTask(title: string, description: string) {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
  }

}
