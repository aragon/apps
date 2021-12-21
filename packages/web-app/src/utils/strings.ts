/**
 * Capitalize the first letter of a string
 * @param string - string to capitalize
 * @param locale - desired language; defaults to browser language.
 * @returns string with first letter capitalized
 */
export function capitalize(
  [firstChar, ...rest]: string,
  locale: string = navigator.language
) {
  return [firstChar.toLocaleUpperCase(locale), ...rest];
}
