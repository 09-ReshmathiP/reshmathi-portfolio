export interface NavLink {
  id: string;
  label: string;
}

/**
 * Anchor targets. Sections are added to the page in later phases
 * (About/Skills in Phase 3, Projects in Phase 5, etc.) but the ids are
 * reserved now so the nav and Hero CTAs are correct from the start and
 * never need retrofitting.
 */
export const navLinks: NavLink[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
