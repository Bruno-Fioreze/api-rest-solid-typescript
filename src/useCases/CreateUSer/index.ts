import { MAilTrapMailProvider } from "../../provides/implementations/MailTrapProvider";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUSerUseCase";


const postgresUserRepository = new PostgresUserRepository()
const mailTrapMailProvider = new MAilTrapMailProvider


const createUserUseCase = new CreateUserUseCase(mailTrapMailProvider,
    postgresUserRepository)

const createUserController = new CreateUserController(
    createUserUseCase
)

export {
    createUserUseCase, 
    createUserController
}