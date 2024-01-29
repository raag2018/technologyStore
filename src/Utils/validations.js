const emailValidation = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
}
const minPassword = {
    value: 8,
    message: 'Password must be at least 8 characters'
}

const maxPassword = {
    value: 24,
    message: 'Password must be less than 24 characters'
}


export { emailValidation, minPassword, maxPassword }