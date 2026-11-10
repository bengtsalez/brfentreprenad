/** Datum i formatet ÅÅÅÅ-MM-DD som "10 november 2026". Tolkas i UTC så att dagen inte förskjuts. */
export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${value}T00:00:00Z`))
}
