const ERRORS = {
    INVALID_PASSWORD: 'неверный пароль',
    EMAIL_NOT_FOUND: 'пользователя с таким email не существует',
    auth: 'войдите в систему'
}

export function error(code) {
    return ERRORS[code] ? ERRORS[code] : 'неизвестная ошибка'
}