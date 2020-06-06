import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto : GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    }
    return this.taskService.getAllTasks();
  }
  
  @Post()
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
  updateTask(@Param('id') id : string, @Body('status') status: TaskStatus) : Task {
    return this.taskService.updateTask(id, status);
  }
}
