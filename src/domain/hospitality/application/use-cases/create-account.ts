import { type Either, left, right } from '@/core/either'
import type { UseCaseError } from '@/core/errors/use-case-error'
import { User } from '../../enterprise/entities/user'
import type { HashGenerator } from '../cryptography/hash-generator'
import type { UserRepository } from '../repositories/user-repository'
import { BirthDateInFutureError } from './errors/birth-date-in-future-error'
import { NameTooShortError } from './errors/name-too-short-error'
import { TaxIdAlreadyExistsError } from './errors/tax-id-already-exists-error'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateAccountUseCaseRequest {
  email: string
  password: string
  taxId: string
  name: string
  birthDate: Date
}

type CreateAccountUseCaseResponse = Either<UseCaseError, { userId: string }>

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
    )

    if (emailAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    const taxIdAlreadyExists = await this.userRepository.findByTaxId(
      input.taxId
    )

    if (taxIdAlreadyExists) {
      return left(new TaxIdAlreadyExistsError())
    }

    if (
      typeof input.name === 'string'
      && (!input.name || input.name.trim().length < 3)
    ) {
      return left(new NameTooShortError())
    }

    if (input.birthDate >= new Date()) {
      return left(new BirthDateInFutureError())
    }

    const hashedPassword = await this.hashGenerator.hash(input.password)

    const user = User.create({
      email: input.email,
      password: hashedPassword,
      taxId: input.taxId,
      name: input.name,
      birthDate: input.birthDate,
    })

    await this.userRepository.save(user)

    return right({
      userId: user.id.toString(),
    })
  }
}
