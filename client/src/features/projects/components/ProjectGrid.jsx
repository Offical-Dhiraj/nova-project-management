import ProjectCard from "./ProjectCard";

const ProjectGrid = ({
  projects,
  onDelete,
}) => {
  if (!projects.length) {
    return null;
  }

  return (
    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {projects.map(
        (project) => (
          <ProjectCard
            key={
              project._id ||
              project.id
            }
            project={project}
            onDelete={onDelete}
          />
        ),
      )}
    </div>
  );
};

export default ProjectGrid;