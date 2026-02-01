import type { UseCaseError } from '@/core/errors/use-case-error'

export class BirthDateInFutureError extends Error implements UseCaseError {
  constructor() {
    super('Birth date cannot be in the future.')
  }
}
