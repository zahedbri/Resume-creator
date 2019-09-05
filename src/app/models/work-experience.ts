export class WorkExperience {
    company: string;
    position: string;
    dateStarted: string;
    dateEnded: string;
    about: string;

    constructor(company: string, position: string, dateStarted: string, dateEnded: string, about: string) {
        this.company = company;
        this.position = position;
        this.dateStarted = dateStarted;
        this.dateEnded = dateEnded;
        this.about = about;
    }
}