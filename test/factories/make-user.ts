import { faker } from '@faker-js/faker/locale/pt_BR'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/hospitality/enterprise/entities/user'

export function makeUserFactory(
  override: Partial<User> = {},
  id?: UniqueEntityID
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.past({
        years: 30,
        refDate: new Date(),
      }),
      taxId: faker.string.uuid(),
      ...override,
    },
    id
  )

  return user
}
