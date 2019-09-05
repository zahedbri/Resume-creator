import { Contact } from './contact';
import { Education } from './education';
import { Reference } from './reference';
import { WorkExperience } from './work-experience';
import { Project } from './project';
import { Skill } from './skill';

export class Resume {
    firstName: string;
    lastName: string;
    summary: string;
    skills: Skill[];
    contact: Contact[];
    education: Education[];
    projects: Project[];
    references: Reference[];
    workExperience: WorkExperience[];

    constructor(firstName: string, lastName: string, summary: string, skills: Skill[], contact: Contact[], education: Education[], projects: Project[], references: Reference[], workExperience: WorkExperience[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.summary = summary;
        this.skills = skills;
        this.contact = contact;
        this.education = education;
        this.projects = projects;
        this.references = references;
        this.workExperience = workExperience;
    }
}