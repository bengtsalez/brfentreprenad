import type { HeadingLevel } from '~/types/ui'

/** Rubriknivån under en given nivå, t.ex. för kort inuti en sektion. */
export function childHeadingLevel(level: HeadingLevel): HeadingLevel {
  return Math.min(level + 1, 6) as HeadingLevel
}
