export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => { // Переиспользуемая функция проверки пароля по требованиям
    const errors: string[] = [];
    const hasMinLength = password.length >= 12;
    const hasMaxLength = password.length <= 24;
    const hasDigits = (password.match(/\d/g) || []).length >= 1;
    const hasLetters = (password.match(/[a-zA-Z]/g) || []).length >= 2;
    const hasSpecialChars = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= 3;
  
    if (!hasMinLength) errors.push('Мин. длина пароля: 12 символов');
    if (!hasMaxLength) errors.push('Макс. длина пароля: 24 символа');
    if (!hasDigits) errors.push('Цифр не менее: 1');
    if (!hasLetters) errors.push('Латинских букв не менее: 2');
    if (!hasSpecialChars) errors.push('Спец. символов не менее: 3');
  
    return { isValid: errors.length === 0, errors };
  };
  