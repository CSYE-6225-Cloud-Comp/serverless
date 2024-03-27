import formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData);
import dotenv from 'dotenv';
import { PubSub } from '@google-cloud/pubsub';

dotenv.config();

const API_KEY = process.env.MAILGUN_API_KEY || 'd4f296f80a260f2c2f0fad5d8599c28a-f68a26c9-0b771f31';
const DOMAIN = process.env.MAILGUN_DOMAIN || 'cloudnativeapp.me';

const mg = mailgun.client({username: 'api', key: API_KEY});

export const sendMail = async (from, to, subject, html) => {
    try {
        const message = await mg.messages.create(DOMAIN, {
            from: from,
            to: to,
            subject: subject,
            html: html
        })
    } catch (error) {
        console.log(error);
    }
};
