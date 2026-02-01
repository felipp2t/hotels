import type { UseCaseError } from '@/core/errors/use-case-error'

export class TaxIdAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Tax ID already exists.')
  }
}
