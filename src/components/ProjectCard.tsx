import Image from 'next/image';
import { Project } from '@/types/project';

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200">
      <div className="relative w-full h-48">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-accent-blue mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech: string) => (
            <span key={tech} className="px-2 py-1 bg-accent-purple text-xs rounded text-white">{tech}</span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-purple transition-colors"
        >
          View Project
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
