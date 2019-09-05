import * as jsPDF from 'jspdf';
import { Fonts } from './fonts';
import { Resume } from './resume';
import { Utilities } from '../utils/utilities';

export class PDFGenerator {
    //A4 Paper Size (mm)
    fullWidth = 210;
    fullHeight = 297;

    //Margins (mm)
    marginTop = 25.4;
    marginBottom = 25.4;
    marginLeft = 12.7;
    marginRight = 12.7;

    //Useable space
    width = this.fullWidth - this.marginLeft - this.marginRight;
    height = this.fullHeight - this.marginTop - this.marginBottom;

    sections = {
        top: {
            xLeft: this.marginLeft,
            xRight: this.fullWidth - this.marginRight,
            yTop: this.marginTop,
            yBottom: this.marginTop,
            xPos: this.marginLeft,
            yPos: this.marginTop,
            width: this.fullWidth - this.marginRight - this.marginLeft
        },
        leftColumn: { // 1/3rd width
            xLeft: this.marginLeft,
            xRight: (this.fullWidth) * 1/3,
            yTop: this.marginTop,
            yBottom: this.marginBottom,
            xPos: this.marginLeft,
            yPos: this.marginTop,
            width: ((this.fullWidth) * 1/3) - this.marginLeft
        },
        rightColumn: { // 2/3rd width
            xLeft: (this.fullWidth) * 1/3 + 3,
            xRight: this.fullWidth - this.marginRight,
            yTop: this.marginTop,
            yBottom: this.marginBottom,
            xPos: (this.fullWidth) * 1/3 + 3,
            yPos: this.marginTop,
            width: (this.fullWidth - this.marginRight) - ((this.fullWidth) * 1/3 + 3)
        },
    };

    //Current location
    xPos = this.marginLeft;
    yPos = this.marginTop;

    //Document
    doc = new jsPDF();

    //Resume data
    resume: Resume;

    constructor(resume: Resume) {
        //Set resume
        this.resume = resume;
        
        //Add Fonts
        this.addFonts();
    }

    addFonts() {
        //Roboto Regular
        this.doc.addFileToVFS("Roboto-Regular.ttf", Fonts.RobotoBase64);
        this.doc.addFont("Roboto-Regular.ttf", "Roboto", "normal")
        this.doc.setFont("Roboto");

        //Roboto Light
        this.doc.addFileToVFS("Roboto-Light.ttf", Fonts.RobotoLightBase64);
        this.doc.addFont("Roboto-Light.ttf", "Roboto Light", "normal")
        this.doc.setFont("Roboto");

        //Roboto Bold
        this.doc.addFileToVFS("Roboto-Bold.ttf", Fonts.RobotoBoldBase64);
        this.doc.addFont("Roboto-Bold.ttf", "Roboto Bold", "normal")
    }

    generatePDF() {
        //Top section, containing name
        this.writeLine(this.resume.firstName + " " + this.resume.lastName, "center", 1.5, "Roboto", 36, this.sections.top);

        //Left section, contains education and contact info
        //Contact:
        if(this.resume.contact.length > 0) {
            this.writeLine("Contact", "left", 0.5, "Roboto Bold", 18, this.sections.leftColumn);
            for(let contact of this.resume.contact) {
                this.writeLine(contact.type, "left", 0.15, "Roboto Light", 16, this.sections.leftColumn);
                this.writeLine(contact.info, "left", 0.15, "Roboto", 12, this.sections.leftColumn);
                this.writeLargeSpacer(this.sections.leftColumn);
            }
        }

        //Education:
        if(this.resume.education.length > 0) {
            this.writeLine("Education", "left", 0.5, "Roboto Bold", 18, this.sections.leftColumn);
            for(let education of this.resume.education) {
                this.writeLine(education.school, "left", 0.15, "Roboto Light", 16, this.sections.leftColumn);
                
                if(!Utilities.isStringEmpty(education.degree)) {
                    this.writeLine(education.degree, "left", 0.15, "Roboto", 12, this.sections.leftColumn);
                }

                if(!Utilities.isStringEmpty(education.dateStarted) && !Utilities.isStringEmpty(education.dateEnded)) {
                    this.writeLine(education.dateStarted + " - " + education.dateEnded, "left", 0.15, "Roboto", 12, this.sections.leftColumn);
                }

                this.writeLargeSpacer(this.sections.leftColumn);
            }
        }

        //Skills:
        if(this.resume.skills.length > 0) {
            this.writeLine("Skills", "left", 0.5, "Roboto Bold", 18, this.sections.leftColumn);

            //Set the font before measuring width, for accurate measurement
            this.setFont("Roboto", 12);
            
            let index = 0;
            let currentLine = "";

            for(let skill of this.resume.skills) {
                if(currentLine === "") {
                    currentLine = skill.info;
                }
                else if(this.getTextWidth(currentLine + "  -  " + skill.info) < this.sections.leftColumn.width) {
                    currentLine = currentLine + "  -  " + skill.info;
                }
                else {
                    this.writeLine(currentLine, "left", 0.15, "Roboto", 12, this.sections.leftColumn);
                    currentLine = skill.info;
                }
            }

            this.writeLine(currentLine, "left", 0.15, "Roboto", 12, this.sections.leftColumn);
            this.writeLargeSpacer(this.sections.leftColumn);
        }

        //About
        if(!Utilities.isStringEmpty(this.resume.summary)) {
            this.writeLine("Summary", "left", 0.5, "Roboto Bold", 18, this.sections.leftColumn);
            this.writeLine(this.resume.summary, "left", 0.15, "Roboto", 12, this.sections.leftColumn);
            this.writeLargeSpacer(this.sections.leftColumn);
        }

        //Right section, contains experience and references
        //Experience:
        if(this.resume.workExperience.length > 0) {
            this.writeLine("Experience", "left", 0.5, "Roboto Bold", 18, this.sections.rightColumn);
            for(let experience of this.resume.workExperience) {
                this.writeLine(experience.company, "left", 0.15, "Roboto Light", 16, this.sections.rightColumn);
    
                //If there is a date and end provided:
                if(!Utilities.isStringEmpty(experience.dateStarted) && !Utilities.isStringEmpty(experience.dateEnded)) {
                    this.writeLine(experience.position + " | " + experience.dateStarted + " - " + experience.dateEnded, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }
                //Else, only print the position
                else {
                    this.writeLine(experience.position, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }
    
                //If there is info about it:
                if(!Utilities.isStringEmpty(experience.about)) {
                    this.writeSpacer(this.sections.rightColumn);
                    this.writeLine(experience.about, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }
    
                this.writeLargeSpacer(this.sections.rightColumn);
            }
        }

        //References
        if(this.resume.references.length > 0) {
            this.writeLine("References", "left", 0.5, "Roboto Bold", 18, this.sections.rightColumn);
            for(let reference of this.resume.references) {
                this.writeLine(reference.firstName + " " + reference.lastName, "left", 0.15, "Roboto Light", 16, this.sections.rightColumn);

                //Position line
                if(!Utilities.isStringEmpty(reference.company) && !Utilities.isStringEmpty(reference.position)) {
                    this.writeLine(reference.position + " at " + reference.company, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }

                //Contact line
                if(!Utilities.isStringEmpty(reference.phone) && !Utilities.isStringEmpty(reference.email)) {
                    this.writeLine(reference.phone + " | " + reference.email, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }
                else if(!Utilities.isStringEmpty(reference.phone)) {
                    this.writeLine(reference.phone, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }
                else if(!Utilities.isStringEmpty(reference.email)) {
                    this.writeLine(reference.email, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }

                //About line
                if(!Utilities.isStringEmpty(reference.about)) {
                    this.writeSpacer(this.sections.rightColumn);
                    this.writeLine(reference.about, "left", 0.15, "Roboto", 12, this.sections.rightColumn);
                }

                this.writeSpacer(this.sections.rightColumn);
            }
        }

        window.open(this.doc.output('bloburl'), '_blank');
    }

    setFont(font: string, fontSize: number) {
        //Set the font
        this.doc.setFont(font);
        this.doc.setFontSize(fontSize);
    }

    //Moves yPos to the next line
    writeLine(text: string, alignment: string, spacing: number, font: string, fontSize: number, section: any) {
        //Set the font
        this.setFont(font, fontSize);

        //Split up the text, for multiline support
        let textArray = this.doc.splitTextToSize(text, section.width);

        //Write text out based on specified alignment
        if(alignment === "left") {
            this.doc.text(textArray, section.xPos, section.yPos);
        }
        else if (alignment === "center") {
            this.doc.text(textArray, ((section.xRight + section.xLeft) / 2) - (this.getTextWidth(textArray) / 2), section.yPos)
        }
        else if (alignment === "right") {
            this.doc.text(textArray, section.xRight - this.getTextWidth(textArray), section.yPos)
        }

        //Move yBottom
        section.yBottom += this.getTextHeight(textArray) + this.getTextHeight(textArray[0]) * spacing;
        section.yPos += this.getTextHeight(textArray) + this.getTextHeight(textArray[0]) * spacing;

        if(section === this.sections.top) {
            this.sections.leftColumn.yTop = section.yBottom;
            this.sections.leftColumn.yPos += this.getTextHeight(textArray) * spacing;
            this.sections.rightColumn.yTop = section.yBottom;
            this.sections.rightColumn.yPos += this.getTextHeight(textArray) * spacing;
        }
    }

    writeSpacer(section: any) {
        //Move yBottom
        section.yBottom += 3;
        section.yPos += 3;

        if(section === this.sections.top) {
            this.sections.leftColumn.yTop = section.yBottom;
            this.sections.leftColumn.yPos += 3;
            this.sections.rightColumn.yTop = section.yBottom;
            this.sections.rightColumn.yPos += 3;
        }
    }

    writeLargeSpacer(section: any) {
        //Move yBottom
        section.yBottom += 7;
        section.yPos += 7;

        if(section === this.sections.top) {
            this.sections.leftColumn.yTop = section.yBottom;
            this.sections.leftColumn.yPos += 7;
            this.sections.rightColumn.yTop = section.yBottom;
            this.sections.rightColumn.yPos += 7;
        }
    }

    //Dimensions
    getTextWidth(text: string) {
        return this.doc.getTextDimensions(text)["w"];
    }

    getTextHeight(text: string) {
        return this.doc.getTextDimensions(text)["h"];
    }
}