import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // @Get()
  // getAllTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO) {

  //   if (filterDTO) {
  //     console.log('Status: ', filterDTO)
  //     return this.tasksService.getFilteredTask(filterDTO)
  //   } else {
  //     console.log('Retornando filterDTO do else (getAllTasks) ', filterDTO)
  //     return this.tasksService.getAllTasks()
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id)
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   this.tasksService.deleteTaskById(id)
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
  //   return this.tasksService.createTask(createTaskDTO)
  // }

  // @Patch('/:id/status')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status)
  // }
}
