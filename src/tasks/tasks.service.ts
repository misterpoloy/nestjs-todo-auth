import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskRepository) private taskRepository : TaskRepository ){}

  async getTasks(
    filterDto : GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User) : Promise<Task> {
    // await this.taskRepository.findOne(id);
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } }); // (*)
    if (!found) throw new NotFoundException();
    return found;
  }

  async updateTask(id: number, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async createTask(createTaskdto : CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskdto, user);
  }

  async deleteTask(id: number, user: User) : Promise<void> {
    // await this.taskRepository.delete(id);
    const result = await this.taskRepository.delete({ id, userId: user.id }); // (*) Notice here does not have where 
    if (result.affected === 0) throw new NotFoundException();
  }
}
