import { User } from "../../enterprise/entities/user";
import type { HashGenerator } from "../cryptography/hash-generator";
import type { UserRepository } from "../repositories/user-repository";

interface CreateAccountUseCaseRequest {
  email: string;
  password: string;
}

export class CreateAccountUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(input: CreateAccountUseCaseRequest) {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      input.email
    );

    if (emailAlreadyExists) {
      throw new Error("Email already in use.");
    }

    const hashedPassword = await this.hashGenerator.hash(input.password);

    const user = User.create({
      email: input.email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return {
      userId: user.id.toString(),
    };
  }
}
