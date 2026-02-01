import type { UserRepository } from '@/domain/hospitality/application/repositories/user-repository'
import type { User } from '@/domain/hospitality/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  items: User[] = []

  async findByTaxId(taxId: string): Promise<User | null> {
    return this.items.find((item) => item.taxId === taxId) ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email) ?? null
  }

  async save(user: User): Promise<void> {
    this.items.push(user)
  }
}
