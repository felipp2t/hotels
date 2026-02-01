import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  private readonly _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  equals(entity: Entity<unknown>) {
    return entity === this || entity.id === this._id
  }
}
