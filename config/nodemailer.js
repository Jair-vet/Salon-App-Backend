import nodemailer from 'nodemailer'

export function createTransport(host, port, user, pass) {
    return nodemailer.createTransport({
        host,
        port,
        auth: {
            user,
            pass
        }
    });
}

// PORT = 4000
// MONGO_URI=mongodb+srv://root:qDYdm6G6liaQjZKl@cluster0.hwl3ryb.mongodb.net/?retryWrites=true&w=majority
// FRONTEND_URL=http://localhost:5173
// EMAIL_HOST=sandbox.smtp.mailtrap.io
// EMAIL_PORT=2525
// EMAIL_USER=a42e245fa1dc1f
// EMAIL_PASS=5cb1b626ea66a4
// 
// 
// # jairaceves56
// # cEnISnObHun59Xzb
// # qDYdm6G6liaQjZKl