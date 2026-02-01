import { Entity } from '@core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface UserProps {
  taxId: string
  name: string
  email: string
  password: string
  birthDate: Date
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set password(newPassword: string) {
    this.props.password = newPassword
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set name(newName: string) {
    this.props.name = newName
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get taxId() {
    return this.props.taxId
  }

  set taxId(newTaxId: string) {
    this.props.taxId = newTaxId
    this.touch()
  }

  get birthDate() {
    return this.props.birthDate
  }

  set birthDate(newBirthDate: Date) {
    this.props.birthDate = newBirthDate
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    return new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    )
  }
}
