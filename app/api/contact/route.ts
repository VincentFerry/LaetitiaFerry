import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json()

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // TODO: Implémenter l'envoi d'email avec Nodemailer ou Resend
    // Pour l'instant, on simule un succès
    console.log('Contact form submission:', {
      name,
      email,
      company,
      message,
      timestamp: new Date().toISOString()
    })

    // En production, vous devrez configurer l'envoi d'email :
    // 
    // import nodemailer from 'nodemailer'
    // 
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // })
    // 
    // await transporter.sendMail({
    //   from: process.env.SMTP_USER,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Nouveau message de ${name}`,
    //   html: `
    //     <h2>Nouveau message depuis le site</h2>
    //     <p><strong>Nom:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Société:</strong> ${company || 'Non renseignée'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // })

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès'
    })
  } catch (error) {
    console.error('Error sending contact form:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}
