import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskdto : CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskdto;
    const task = new Task();
    task.title = title;
    task.description = description;
    await task.save();
    return task;
  }
}
