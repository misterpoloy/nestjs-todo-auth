import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto : GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    }
    return this.taskService.getAllTasks();
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto : CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id : string) : Task {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id : string) : void {
    this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTask(@Param('id') id : string, @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Task {
    return this.taskService.updateTask(id, status);
  }
}
