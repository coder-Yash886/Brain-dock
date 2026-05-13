import nodemailer from 'nodemailer';

const sendEmail = async (options: { email: string; subject: string; message: string }) => {
    // Check if email credentials are provided
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass || emailUser === 'your_email@gmail.com') {
        console.warn('⚠️ EMAIL_USER or EMAIL_PASS not found in .env. Falling back to console logging.');
        console.log(`\n=== EMAIL NOTIFICATION (Simulated) ===`);
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message:\n${options.message}`);
        console.log(`======================================\n`);
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: emailUser,
            to: options.email,
            subject: options.subject,
            html: `<div style="font-family: Inter, system-ui, -apple-system, sans-serif; font-size:14px; color:#111;">${options.message.replace(/\n/g, '<br/>')}</div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${options.email}`);
    } catch (err) {
        console.error('Nodemailer send email error:', err);
        throw err;
    }
};

export default sendEmail;
