export class Reference {
    firstName: string;
    lastName: string;
    company: string;
    position: string;
    phone: string;
    email: string;
    about: string;

    constructor(firstName: string, lastName: string, company: string, position: string, phone: string, email: string, about: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.position = position;
        this.phone = phone;
        this.email = email;
        this.about = about;
    }
}