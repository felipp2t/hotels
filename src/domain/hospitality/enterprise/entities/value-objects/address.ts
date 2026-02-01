import { InvalidAddressError } from './errors/invalid-address-error'

interface AddressProps {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export class Address {
  private readonly props: AddressProps

  constructor(props: AddressProps) {
    this.validateProps(props)
    this.props = {
      ...props,
      street: props.street.trim(),
      number: props.number.trim(),
      complement: props.complement?.trim() || undefined,
      neighborhood: props.neighborhood.trim(),
      city: props.city.trim(),
      state: props.state.trim(),
      zipCode: props.zipCode.replace(/\D/g, ''),
      country: props.country.trim(),
    }
  }

  private validateProps(props: AddressProps): void {
    if (!props.street?.trim()) {
      throw new InvalidAddressError('Street is required')
    }

    if (!props.number?.trim()) {
      throw new InvalidAddressError('Number is required')
    }

    if (!props.neighborhood?.trim()) {
      throw new InvalidAddressError('Neighborhood is required')
    }

    if (!props.city?.trim()) {
      throw new InvalidAddressError('City is required')
    }

    if (!props.state?.trim()) {
      throw new InvalidAddressError('State is required')
    }

    if (!props.zipCode?.trim()) {
      throw new InvalidAddressError('Zip code is required')
    }

    if (!props.country?.trim()) {
      throw new InvalidAddressError('Country is required')
    }

    // Validação básica de CEP brasileiro (8 dígitos)
    const zipCodeDigits = props.zipCode.replace(/\D/g, '')
    if (zipCodeDigits.length !== 8) {
      throw new InvalidAddressError('Zip code must have 8 digits')
    }
  }

  static create(props: AddressProps): Address {
    return new Address(props)
  }

  get street(): string {
    return this.props.street
  }

  get number(): string {
    return this.props.number
  }

  get complement(): string | undefined {
    return this.props.complement
  }

  get neighborhood(): string {
    return this.props.neighborhood
  }

  get city(): string {
    return this.props.city
  }

  get state(): string {
    return this.props.state
  }

  get zipCode(): string {
    return this.props.zipCode
  }

  get country(): string {
    return this.props.country
  }

  get formattedZipCode(): string {
    const digits = this.props.zipCode
    return `${digits.slice(0, 5)}-${digits.slice(5)}`
  }

  get fullAddress(): string {
    const complement = this.props.complement ? `, ${this.props.complement}` : ''
    return `${this.props.street}, ${this.props.number}${complement}, ${this.props.neighborhood}, ${this.props.city} - ${this.props.state}, ${this.formattedZipCode}, ${this.props.country}`
  }

  equals(other: Address): boolean {
    if (!(other instanceof Address)) {
      return false
    }

    return (
      this.props.street === other.props.street
      && this.props.number === other.props.number
      && this.props.complement === other.props.complement
      && this.props.neighborhood === other.props.neighborhood
      && this.props.city === other.props.city
      && this.props.state === other.props.state
      && this.props.zipCode === other.props.zipCode
      && this.props.country === other.props.country
    )
  }

  toString(): string {
    return this.fullAddress
  }
}
