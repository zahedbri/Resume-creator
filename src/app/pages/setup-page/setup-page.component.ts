import { Component, OnInit } from '@angular/core';

//Import models
import { Contact } from '../../models/contact';
import { Education } from 'src/app/models/education';
import { Reference } from 'src/app/models/reference';
import { WorkExperience } from 'src/app/models/work-experience';
import { Resume } from 'src/app/models/resume';
import { PDFGenerator } from 'src/app/models/pdf-generator';
import { Project } from 'src/app/models/project';
import { Skill } from 'src/app/models/skill';
import { Utilities } from 'src/app/utils/utilities';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {

  firstName: string = "Carter";
  lastName: string = "";
  summary: string = "";

  contact: Contact[] = [
  ];

  skills: Skill[] = [
  ];

  education: Education[] = [
  ];

  workExperience: WorkExperience[] = [

  ];

  projects: Project[] = [

  ];

  references: Reference[] = [

  ];

  constructor() {
  }

  ngOnInit() {
  }

  addSkill() {
    this.skills.push(new Skill(null));
  }

  removeSkill(skill: Skill) {
    let index = this.skills.indexOf(skill);
    if(index > -1) {
      this.skills.splice(index, 1);
    }
  }

  addContact() {
    this.contact.push(new Contact("Phone", null));
  }

  removeContact(contact: Contact) {
    let index = this.contact.indexOf(contact);
    if(index > -1) {
      this.contact.splice(index, 1);
    }
  }

  addEducation() {
    this.education.push(new Education(null, null, null, null));
  }

  removeEducation(education: Education) {
    let index = this.education.indexOf(education);
    if(index > -1) {
      this.education.splice(index, 1);
    }
  }

  addExperience() {
    this.workExperience.push(new WorkExperience(null, null, null, null, null));
  }

  removeExperience(experience: WorkExperience) {
    let index = this.workExperience.indexOf(experience);
    if(index > -1) {
      this.workExperience.splice(index, 1);
    }
  }

  addProject() {
    this.projects.push(new Project(null, null, null));
  }

  removeProject(project: Project) {
    let index = this.projects.indexOf(project);
    if(index > -1) {
      this.projects.splice(index, 1);
    }
  }

  addReference() {
    this.references.push(new Reference(null, null, null, null, null, null, null));
  }

  removeReference(reference: Reference) {
    let index = this.references.indexOf(reference);
    if(index > -1) {
      this.references.splice(index, 1);
    }
  }

  //Removes empty objects if they exist
  validateData() {
    //Skills
    for(let skill of this.skills.slice()) {
      if(Utilities.isEmpty(skill)) {
        this.removeSkill(skill);
      }
    }

    //Contacts (Handled differently, as they have a default value)
    for(let contact of this.contact.slice()) {
      if(Utilities.isStringEmpty(contact.info)) {
        this.removeContact(contact);
      }
    }

    //Education
    for(let education of this.education.slice()) {
      if(Utilities.isEmpty(education)) {
        this.removeEducation(education);
      }
    }

    //Experience
    for(let experience of this.workExperience.slice()) {
      if(Utilities.isEmpty(experience)) {
        this.removeExperience(experience);
      }
    }

    //Projects
    for(let project of this.projects.slice()) {
      if(Utilities.isEmpty(project)) {
        this.removeProject(project);
      }
    }

    //References
    for(let reference of this.references.slice()) {
      if(Utilities.isEmpty(reference)) {
        this.removeReference(reference);
      }
    }
  }

  confirmClicked() {
    //Validate data
    this.validateData();

    //Generate PDF
    let resume = new Resume(this.firstName, this.lastName, this.summary, this.skills, this.contact, this.education, this.projects, this.references, this.workExperience);
    let pdfGenerator = new PDFGenerator(resume);
    pdfGenerator.generatePDF();
  }
}
