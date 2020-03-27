import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import Project from "../schemas/Project";
import { ProjectData, projects, tasks } from "../data/data";

@Resolver(of => Project)
export default class {

    @Query(returns => Project, { nullable: true })
    projectByName(@Arg("name") name: string): ProjectData | undefined {
        return projects.find(project => project.name === name);
    }

    @FieldResolver()
    tasks(@Root() projectData: ProjectData) {
        return tasks.filter(task => task.projectId === projectData.id)
    }
}
