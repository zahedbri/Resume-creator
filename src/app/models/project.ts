export class Project {
    name: string;
    url: string;
    about: string;

    constructor(name: string, url: string, about: string) {
        this.name = name;
        this.url = url;
        this.about = about;
    }
}