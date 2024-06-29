import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly AllowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any) {
    value = value.toUpperCase()

    if (this.AllowedStatuses.includes(value)) {
      return value
    } 

    throw new BadRequestException(`"${value}" is not a valid status option`)

  }
}