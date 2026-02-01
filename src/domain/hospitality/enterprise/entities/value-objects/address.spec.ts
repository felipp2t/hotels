import { Address } from './address'
import { InvalidAddressError } from './errors/invalid-address-error'

describe('Address Value Object', () => {
  it('should create a valid address', () => {
    const address = Address.create({
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil',
    })

    expect(address).toBeInstanceOf(Address)
    expect(address.street).toBe('Rua das Flores')
    expect(address.number).toBe('123')
    expect(address.complement).toBe('Apto 45')
    expect(address.neighborhood).toBe('Centro')
    expect(address.city).toBe('São Paulo')
    expect(address.state).toBe('SP')
    expect(address.zipCode).toBe('01234567')
    expect(address.country).toBe('Brasil')
  })

  it('should create address without complement', () => {
    const address = Address.create({
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234567',
      country: 'Brasil',
    })

    expect(address.complement).toBeUndefined()
  })

  it('should trim whitespace from all fields', () => {
    const address = Address.create({
      street: '  Rua das Flores  ',
      number: '  123  ',
      complement: '  Apto 45  ',
      neighborhood: '  Centro  ',
      city: '  São Paulo  ',
      state: '  SP  ',
      zipCode: '  01234-567  ',
      country: '  Brasil  ',
    })

    expect(address.street).toBe('Rua das Flores')
    expect(address.number).toBe('123')
    expect(address.complement).toBe('Apto 45')
    expect(address.neighborhood).toBe('Centro')
    expect(address.city).toBe('São Paulo')
    expect(address.state).toBe('SP')
    expect(address.country).toBe('Brasil')
  })

  it('should remove non-digit characters from zipCode', () => {
    const address = Address.create({
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '012.34-567',
      country: 'Brasil',
    })

    expect(address.zipCode).toBe('01234567')
  })

  it('should format zipCode correctly', () => {
    const address = Address.create({
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234567',
      country: 'Brasil',
    })

    expect(address.formattedZipCode).toBe('01234-567')
  })

  it('should generate full address correctly with complement', () => {
    const address = Address.create({
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234567',
      country: 'Brasil',
    })

    expect(address.fullAddress).toBe(
      'Rua das Flores, 123, Apto 45, Centro, São Paulo - SP, 01234-567, Brasil'
    )
    expect(address.toString()).toBe(address.fullAddress)
  })

  it('should generate full address correctly without complement', () => {
    const address = Address.create({
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234567',
      country: 'Brasil',
    })

    expect(address.fullAddress).toBe(
      'Rua das Flores, 123, Centro, São Paulo - SP, 01234-567, Brasil'
    )
  })

  describe('Validation', () => {
    it('should throw error when street is empty', () => {
      expect(() => {
        Address.create({
          street: '',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234567',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('Street is required'))
    })

    it('should throw error when street is only whitespace', () => {
      expect(() => {
        Address.create({
          street: '   ',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234567',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('Street is required'))
    })

    it('should throw error when number is empty', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234567',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('Number is required'))
    })

    it('should throw error when neighborhood is empty', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '123',
          neighborhood: '',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234567',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('Neighborhood is required'))
    })

    it('should throw error when city is empty', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: '',
          state: 'SP',
          zipCode: '01234567',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('City is required'))
    })

    it('should throw error when state is empty', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: '',
          zipCode: '01234567',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('State is required'))
    })

    it('should throw error when zipCode is empty', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('Zip code is required'))
    })

    it('should throw error when country is empty', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234567',
          country: '',
        })
      }).toThrow(new InvalidAddressError('Country is required'))
    })

    it('should throw error when zipCode has less than 8 digits', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '0123456',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('Zip code must have 8 digits'))
    })

    it('should throw error when zipCode has more than 8 digits', () => {
      expect(() => {
        Address.create({
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '012345678',
          country: 'Brasil',
        })
      }).toThrow(new InvalidAddressError('Zip code must have 8 digits'))
    })
  })

  describe('Equality', () => {
    it('should return true for identical addresses', () => {
      const address1 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      const address2 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      expect(address1.equals(address2)).toBe(true)
    })

    it('should return false for addresses with different streets', () => {
      const address1 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      const address2 = Address.create({
        street: 'Rua das Rosas',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      expect(address1.equals(address2)).toBe(false)
    })

    it('should return false for addresses with different numbers', () => {
      const address1 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      const address2 = Address.create({
        street: 'Rua das Flores',
        number: '456',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      expect(address1.equals(address2)).toBe(false)
    })

    it('should return false for addresses with different complements', () => {
      const address1 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      const address2 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 46',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      expect(address1.equals(address2)).toBe(false)
    })

    it('should return false for address with complement vs without complement', () => {
      const address1 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      const address2 = Address.create({
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      expect(address1.equals(address2)).toBe(false)
    })

    it('should return false when comparing with non-Address object', () => {
      const address = Address.create({
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234567',
        country: 'Brasil',
      })

      expect(address.equals({} as Address)).toBe(false)
      expect(address.equals(null as any)).toBe(false)
      expect(address.equals('string' as any)).toBe(false)
    })
  })
})
