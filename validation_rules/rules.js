module.exports = {
    users: {
        create: {
            firstName: {
                required: false,
                message: 'Name cannot be empty'
            },
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            phone: {
                required: false,
                len: 10,
                message: 'Invalid Phone'
            },
            password: {
                required: false,
                min: 4,
                message: 'Invalid Password'
            }
        },
        update: {
            name: {
                required: false,
                message: 'Name cannot be empty'
            },
            email: {
                required: false,
                type: 'email',
                message: 'Invalid email'
            },
           
        },
        login: {
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            password: {
                required: true,
                message: 'Password cannot be empty'
            }
        },
        changePassword: {
            oldPassword: {
                required: true,
                min: 4,
                message: 'Invalid old password'
            },
            newPassword: {
                required: true,
                min: 4,
                message: 'Invalid new password'
            },
            confirmPassword: {
                required: true,
                min: 4,
                message: 'Invalid confirm password'
            }
        }
    },

    books: {
        create: {
            genre: {
                required: false,
                message: 'Genre cannot be empty'
            },
            title: {
                required: true,
                message: 'Title cannot be empty'
            },
           
            author: {
                required: true,
                message: 'Author cannot be empty'
            },
            edition: {
                required: true,
                message: 'Invalid Edition'
            },
            isbn: {
                required: true,
                message: 'ISBN cannot be empty'
            },
            
        },
        request: {
            genre: {
                required: false,
                message: 'Genre cannot be empty'
            },
            title: {
                required: true,
                message: 'Title cannot be empty'
            },
            author: {
                required: false,
                message: 'Author cannot be empty'
            },
            edition: {
                required: false,
                message: 'Invalid Edition'
            },
            isbn: {
                required: false,
                message: 'ISBN cannot be empty'
            }
        }
    }
};
