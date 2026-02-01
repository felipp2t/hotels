import { FakeHasher } from '@test/cryptography/fake-hasher'
import { InMemoryUserRepository } from '@test/repositories/user-repository'
import { left } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { CreateAccountUseCase } from './create-account'
import { BirthDateInFutureError } from './errors/birth-date-in-future-error'
import { NameTooShortError } from './errors/name-too-short-error'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher

let sut: CreateAccountUseCase

describe('Create Account', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()

    sut = new CreateAccountUseCase(inMemoryUserRepository, fakeHasher)
  })

  it('should be able create a new account', async () => {
    const result = await sut.execute({
      taxId: 'OI87TR060000006554549280047104',
      email: 'johapocid@gmail.com',
      password: '123456',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      userId: inMemoryUserRepository.items[0].id.toString(),
    })
  })

  it('should not be able to create a new account with an email that is already in use', async () => {
    const user = User.create({
      taxId: 'TT698Z9L4061914862714880',
      email: 'to@gmail.com',
      password: 'hashed-password',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
    })

    await inMemoryUserRepository.save(user)

    const result = sut.execute({
      taxId: 'OI87TR060000006554549280047104',
      email: 'to@gmail.com',
      password: '123456',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
    })

    await expect(result).resolves.toEqual(left(new UserAlreadyExistsError()))
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      taxId: 'OJ11UASB859839028789248',
      email: 'itudul@gmail.com',
      password: '123456',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to create a new account with a name shorter than 3 characters', async () => {
    const result = sut.execute({
      taxId: 'IK0695U8000000006153807662678016',
      email: 'veger@gmail.com',
      password: '123456',
      name: 'Li',
      birthDate: new Date('1990-01-01'),
    })

    await expect(result).resolves.toEqual(left(new NameTooShortError()))
  })

  it('should not be able to create a new account with a birth date in the future', async () => {
    const result = sut.execute({
      taxId: 'YP69VAFA00004379733802352640',
      email: 'ha@gmail.com',
      password: '123456',
      name: 'John Doe',
      birthDate: new Date('2090-01-01'),
    })

    await expect(result).resolves.toEqual(left(new BirthDateInFutureError()))
  })

  it('should not be able to create a new account with a name shorter than 3 characters', async () => {
    const result = sut.execute({
      taxId: 'IK0695U8000000006153807662678016',
      email: 'veger@gmail.com',
      password: '123456',
      name: 'Li',
      birthDate: new Date('1990-01-01'),
    })

    await expect(result).resolves.toEqual(left(new NameTooShortError()))
  })

  it('should not be able to create a new account with a birth date in the future', async () => {
    const result = sut.execute({
      taxId: 'YP69VAFA00004379733802352640',
      email: 'ha@gmail.com',
      password: '123456',
      name: 'John Doe',
      birthDate: new Date('2090-01-01'),
    })

    await expect(result).resolves.toEqual(left(new BirthDateInFutureError()))
  })
})
