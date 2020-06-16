import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getAllTasks(@Query(ValidationPipe) filterDto : GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTaskWithFilters(filterDto);
  //   }
  //   return this.taskService.getAllTasks();
  // }
  
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto : CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id : number) : Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id : number) : Promise<void> {
    return this.taskService.deleteTask(id);
  }

  // @Patch(':id/status')
  // updateTask(@Param('id') id : string, @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Task {
  //   return this.taskService.updateTask(id, status);
  // }
}
