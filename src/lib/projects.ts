import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export function sortByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}

export function getFeatured(projects: Project[]): Project[] {
  return sortByOrder(projects.filter((p) => p.data.featured));
}
