import type { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidAddressError extends Error implements UseCaseError {}
