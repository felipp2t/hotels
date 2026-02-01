import { Entity } from '@core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import type { Address } from './value-objects/address'

interface HotelProps {
  name: string
  rating: number
  address: Address
  createdAt: Date
  updatedAt: Date
}

export class Hotel extends Entity<HotelProps> {
  get name() {
    return this.props.name
  }

  set name(newName: string) {
    this.props.name = newName
    this.touch()
  }

  get rating() {
    return this.props.rating
  }

  set rating(newRating: number) {
    this.props.rating = newRating
    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(newAddress: Address) {
    this.props.address = newAddress
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<HotelProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    return new Hotel(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    )
  }
}
