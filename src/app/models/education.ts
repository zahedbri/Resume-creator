export class Education {
    school: string;
    degree: string;
    dateStarted: string;
    dateEnded: string;

    constructor(school: string, degree: string, dateStarted: string, dateEnded: string) {
        this.school = school;
        this.degree = degree;
        this.dateStarted = dateStarted;
        this.dateEnded = dateEnded;
    }
}