export const requiredField = value => {
  if (value) return undefined;
  return "Это поле обязательно заполните";
}

export const requiredFieldCheckbox = value => {
  if (value) return undefined;
  return "Это надо нажать!";
}

export const maxLengthHandle = (max) => {
    return (value) => {
    if (value && value.length > max) return `Не больше ${max} символов можно`;
    return undefined;
  }
}