import { Injectable, NotFoundException } from '@nestjs/common';
//import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from './dto/create-task.dto';
//import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskRepository) private taskRepository : TaskRepository ){}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(filterDto : GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let filterTasks = [ ...this.tasks ];

  //   if (status) {
  //     filterTasks = filterTasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     filterTasks = filterTasks.filter(task => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //   return filterTasks;
  // }

  async getTaskById(id: number) : Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException();
    return found;
  }

  // updateTask(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  async createTask(createTaskdto : CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskdto);
  }

  async deleteTask(id: number) : Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}
