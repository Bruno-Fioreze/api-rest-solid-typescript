import { User } from "../../entities/User";
import { IMailProvider } from "../../provides/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase { 
    // first 
    // private userRepository: IUserRepository;

    // constructor(
    //     userRepository: IUserRepository
    // ){
    //     this.userRepository = userRepository
    // }

    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ){}
    
    async execute( data: ICreateUserRequestDTO ): Promise<void> {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email)
        if (userAlreadyExists) {
            throw new Error("User already exists.");
        }

        const user = new User(data);
        await this.userRepository.save(user);
        const data_email = {
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: "Equipe do meu App",
                email: "equipe@meuapp.com"
            },
            subject: "Seja Bem-vindo à plataforma",
            body: '<p> Vocé já pode fazer login na nossa plataforma. </p>'
        }
        
        await this.mailProvider.sendMail(data_email)
    }
}