import { type Either, left, right } from "@/core/either";
import type { UseCaseError } from "@/core/errors/use-case-error";
import { User } from "../../enterprise/entities/user";
import type { HashGenerator } from "../cryptography/hash-generator";
import type { UserRepository } from "../repositories/user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateAccountUseCaseRequest {
  email: string;
  password: string;
}

type CreateAccountUseCaseResponse = Either<UseCaseError, { userId: string }>;

export class CreateAccountUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(
    input: CreateAccountUseCaseRequest
  ): Promise<CreateAccountUseCaseResponse> {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      input.email
    );

    if (emailAlreadyExists) {
      return left(new UserAlreadyExistsError());
    }

    const hashedPassword = await this.hashGenerator.hash(input.password);

    const user = User.create({
      email: input.email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return right({
      userId: user.id.toString(),
    });
  }
}
