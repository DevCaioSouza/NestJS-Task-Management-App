import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { createQueryBuilder, Repository } from 'typeorm'
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) { }

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO
    const query = this.taskRepository.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      // LIKE allows partial terms (substring) to be searched, being more forgiving than '='
      // the '%%' is also used with that purpose
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    const tasks = await query.getMany()
    return tasks
  }


  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } })

    if (!found) {
      throw new NotFoundException(`Task with the ID "${id}" not found`)
    }

    return found
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Task with the ID "${id}" not found`)
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const targetTask = await this.getTaskById(id)
    targetTask.status = status
    await targetTask.save()
    return targetTask
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {

    const { title, description } = createTaskDTO

    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()
    return task

    //quando criamos um recurso numa RestAPI, é de boa prática retorná-lo na função
    //isso é ótimo para o dev frontend, pois:
    // 1- Reduz o load do app
    // 2- Quando o objeto é exibido p/ o usuário na tela, não é necessário fazer uma nova requisição
  }
}
