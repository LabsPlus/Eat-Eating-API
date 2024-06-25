export class EmailValidator {

    private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public isValid(email: string): boolean {
        return this.emailRegex.test(email);
    }
   
}