/**
 * ProjectCard - Single project entry with expand/collapse.
 * Used within ProfessionalDetails component.
 */

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiTrash2, FiFolder } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_OPTIONS = [
  'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Express',
  'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'FastAPI',
  'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust',
  'PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'GraphQL',
  'Tailwind CSS', 'Bootstrap', 'Sass', 'Redux', 'Zustand',
];

function ProjectCard({ project, index, onChange, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [techInput, setTechInput] = useState('');

  const handleChange = (field, value) => {
    onChange(index, { ...project, [field]: value });
  };

  const addTech = (tech) => {
    if (!project.techStack?.includes(tech)) {
      handleChange('techStack', [...(project.techStack || []), tech]);
    }
  };

  const removeTech = (tech) => {
    handleChange(
      'techStack',
      (project.techStack || []).filter((t) => t !== tech)
    );
  };

  const handleCustomTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      addTech(techInput.trim());
      setTechInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all hover:shadow-md"
    >
      {/* Card Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-background/50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
          <FiFolder className="h-5 w-5 text-secondary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-text">
            {project.projectName || `Project #${index + 1}`}
          </p>
          <p className="text-xs text-text-muted line-clamp-1">
            {project.description || 'No description'}
          </p>
        </div>
        {isExpanded ? (
          <FiChevronUp className="h-4 w-4 text-text-muted" />
        ) : (
          <FiChevronDown className="h-4 w-4 text-text-muted" />
        )}
      </button>

      {/* Card Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-border px-5 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Project Name */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Project Name</label>
                  <input
                    type="text"
                    value={project.projectName || ''}
                    onChange={(e) => handleChange('projectName', e.target.value)}
                    placeholder="e.g., AlgoArena"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* GitHub Link */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">GitHub Link</label>
                  <input
                    type="url"
                    value={project.githubLink || ''}
                    onChange={(e) => handleChange('githubLink', e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                {/* Live Demo Link */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Live Demo Link</label>
                  <input
                    type="url"
                    value={project.liveDemoLink || ''}
                    onChange={(e) => handleChange('liveDemoLink', e.target.value)}
                    placeholder="https://myapp.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-text">Description</label>
                <textarea
                  value={project.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={2}
                  placeholder="Brief description of your project"
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              {/* Tech Stack */}
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-text">Tech Stack</label>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {TECH_OPTIONS.map((tech) => {
                    const isSelected = project.techStack?.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => (isSelected ? removeTech(tech) : addTech(tech))}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-secondary text-white'
                            : 'bg-background text-text-muted hover:bg-secondary/10 hover:text-secondary'
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleCustomTech}
                  placeholder="Or type custom tech and press Enter"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none placeholder:text-text-muted/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              {/* Delete Button */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-danger transition-colors hover:bg-danger/10"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  Remove Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProjectCard;

