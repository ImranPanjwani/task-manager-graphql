import { Resolver, Query, FieldResolver, Root, Arg, Mutation } from "type-graphql";
import Task from "../schemas/Task";
import { TaskData, tasks, projects } from "../data/data";

@Resolver(of => Task)
export default class {
  @Query(returns => [Task])
  fetchTasks(): TaskData[] {
    return tasks;
  }

  @Query(returns => Task, { nullable: true })
  getTask(@Arg("taskId") taskId: number): TaskData | undefined {
    return tasks.find(task => task.id === taskId);
  }

  @Mutation(returns => Task)
  markAsCompleted(@Arg("taskId") taskId: number): TaskData {
      const task = tasks.find(task => task.id === taskId);
      if(!task) {
          throw new Error(`Couldn't find the task with id: ${taskId}`);
      }
      if (task.completed === true) {
        throw new Error(`Task with id: ${taskId} is already completed`);
      }
      task.completed = true;
      return task;
  }

  @FieldResolver()
  project(@Root() taskData: TaskData) {
    return projects.find(project => project.id === taskData.projectId);
  }
}
