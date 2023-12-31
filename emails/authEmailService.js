import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Send email
    const info = await transporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com>',
        to: email,
        subject: "AppSalon - Confirm your Account",
        text: "AppSalon - Confirm your Account",
        html: `<p>Hello: ${name}, Confirm your Account en AppSalon</p>
            <p>Your account is almost ready, you just have to confirm it in the link:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirm Account</a>
            <p>If you did not create this account, you can ignore this message</p>
        `
    })

    console.log('Message sent to your email account', info.messageId)
}

export async function sendEmailPasswordReset({name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com>',
        to: email,
        subject: "AppSalon - Reestablece tu password",
        text: "AppSalon - Reestablece tu password",
        html: `<p>Hola: ${name}, has solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Reestablecer Password</a>
            <p>Si tu no solicitaste esto, puedes ignorar este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}