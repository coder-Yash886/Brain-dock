import { Resend } from 'resend';

const sendEmail = async (options: { email: string; subject: string; message: string }) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.log(`\n=== EMAIL NOTIFICATION (Simulated) ===`);
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message:\n${options.message}`);
        console.log(`======================================\n`);
        return;
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM || 'onboarding@resend.dev';

    try {
        await resend.emails.send({
            from: fromAddress,
            to: options.email,
            subject: options.subject,
            html: `<div style="font-family: Inter, system-ui, -apple-system, sans-serif; font-size:14px; color:#111;">${options.message.replace(/\n/g, '<br/>')}</div>`,
        });
    } catch (err) {
        console.error('Resend send email error:', err);
        throw err;
    }
};

export default sendEmail;
