import type { User } from '../../enterprise/entities/user'

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract save(user: User): Promise<void>
}
