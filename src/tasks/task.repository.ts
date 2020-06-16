import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) query.andWhere('task.status = :status',{ status: status} );
    if (search) query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{ search: `%${search}%`} );

    const tasks = query.getMany();
    return tasks;
  }

  async createTask(createTaskdto : CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskdto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
