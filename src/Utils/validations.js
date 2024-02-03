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

const nameValidation = {
    value: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    message: 'Name is required'
}
const imgValidation = {
    value: /^[a-zA-ZÀ-ÿ\s][0-9]{10,200}$/,
    message: 'Image is required'
}
const descriptionValidation = {
    value: /^[a-zA-Z0-9\s]{10,200}$/,
    message: 'Description is required'
}
const contentValidation = {
    value: /^[a-zA-Z0-9\s]{10,200}$/,
    message: 'Content is required'
}

const lastNameValidatio = {
    value: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    message: 'LastName is required'
}
export { emailValidation, minPassword, maxPassword, nameValidation,  lastNameValidatio, imgValidation, descriptionValidation, contentValidation}