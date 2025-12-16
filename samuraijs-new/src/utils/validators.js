export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const isCheckedCheckbox = (error) => value => {//замыкание для добавления в функцию ногвого аргуиента, чтобы для чекбокса в аргументе писать свою ошибку
  if (value) {
    return undefined;
  }
  return error;
}

export const requiredField = (value) => {
  if (value) {
    return undefined;
  }
  return 'Это обязательное поле';
}

export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length < maxLength) {
    return undefined;
  }
  return `Не более ${maxLength} значков здесь пишите`;
}

