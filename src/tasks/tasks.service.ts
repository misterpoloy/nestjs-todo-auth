import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskRepository) private taskRepository : TaskRepository ){}

  async getTasks(filterDto : GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number) : Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException();
    return found;
  }

  async updateTask(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async createTask(createTaskdto : CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskdto);
  }

  async deleteTask(id: number) : Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}
