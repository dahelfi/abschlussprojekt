export class User{
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;

    constructor(obj?: any){
        this.firstName = obj ? obj.firstName : 'test';
        this.lastName = obj ? obj.lastName : 'test';
        this.email = obj ? obj.email : 'test';
        this.birthDate = obj ? obj.birthDate : 0;
        this.street = obj ? obj.street : 'test';
        this.zipCode = obj ? obj.zipCode : 0;
        this.city = obj ? obj.city : 'test';
    }

    public toJSON(){
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email : this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city

        };

    }
}