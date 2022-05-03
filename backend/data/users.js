import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: true
    },
    {
        name: 'John Constantine',
        email: 'john@example.com',
        password: bcrypt.hashSync('12345999', 10)
    },
    {
        name: 'Gabriel Angel',
        email: 'gabriel@example.com',
        password: bcrypt.hashSync('12345666', 10)
    }
]

export default users