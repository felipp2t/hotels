import type { UseCaseError } from '@/core/errors/use-case-error'

export class NameTooShortError extends Error implements UseCaseError {
  constructor() {
    super('Name should be at least 3 characters long.')
  }
}
