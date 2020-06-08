import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from "./task.model";
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto : GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let filterTasks = [ ...this.tasks ];

    if (status) {
      filterTasks = filterTasks.filter(task => task.status === status);
    }
    if (search) {
      filterTasks = filterTasks.filter(task => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return filterTasks;
  }

  getTaskById(id: string) : Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) throw new NotFoundException();
    return found;
  }

  updateTask(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createTask(createTaskdto : CreateTaskDto): Task {
    const { title, description } = createTaskdto;
    const task : Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) : void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
