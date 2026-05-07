export const PASSWORD_MIN_LENGTH = 8

const HAS_LOWERCASE_REGEX = /[a-z]/
const HAS_UPPERCASE_REGEX = /[A-Z]/
const HAS_DIGIT_REGEX = /\d/

export function getPasswordValidationError(password: string): string | null {
  if (!password.trim()) {
    return 'Введите пароль'
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`
  }
  if (!HAS_LOWERCASE_REGEX.test(password)) {
    return 'Пароль должен содержать строчную букву'
  }
  if (!HAS_UPPERCASE_REGEX.test(password)) {
    return 'Пароль должен содержать заглавную букву'
  }
  if (!HAS_DIGIT_REGEX.test(password)) {
    return 'Пароль должен содержать цифру'
  }

  return null
}

export function getConfirmPasswordValidationError(password: string, confirmPassword: string): string | null {
  if (!confirmPassword.trim()) {
    return 'Подтвердите пароль'
  }
  if (password !== confirmPassword) {
    return 'Пароли не совпадают'
  }

  return null
}
