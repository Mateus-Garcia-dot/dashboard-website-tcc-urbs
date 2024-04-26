export class Usuario {

    constructor(name: string, email: string, birthday: string, cellphone: string, password: string, cpf: string, isAdmin: boolean){
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.cellphone = cellphone;
        this.password = password;
        this.cpf = cpf;
    }

    name: string;
    email: string;
    birthday: string;
    cellphone: string;
    password: string;
    cpf: string;
    
}
