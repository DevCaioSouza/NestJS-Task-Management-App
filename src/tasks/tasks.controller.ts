import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum'

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

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO)
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
