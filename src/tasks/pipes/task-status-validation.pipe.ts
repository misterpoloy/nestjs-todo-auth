import { PipeTransform, BadRequestException } from "@nestjs/common"; // ArgumentMetadata
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status`);
    }
    return value;
  }

  private isStatusValid(status: string): boolean {
    const idx = this.allowedStatus.findIndex(taskStatus => taskStatus === status);
    return idx !== -1;
  }
}
