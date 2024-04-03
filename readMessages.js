import {PubSub} from '@google-cloud/pubsub';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData);
import dotenv from 'dotenv';
import Email from './email.js';

dotenv.config();

const pubSubClient = new PubSub();

const API_KEY = process.env.MAILGUN_API_KEY || 'd4f296f80a260f2c2f0fad5d8599c28a-f68a26c9-0b771f31';
const DOMAIN = process.env.MAILGUN_DOMAIN || 'cloudnativeapp.me';

export const listenForMessages = (subscriptionNameOrId, timeout) => {
  let messageCount = 0;
    const subscription = pubSubClient.subscription(subscriptionNameOrId);
    const mg = mailgun.client({username: 'api', key: API_KEY});
    const messageHandler = message => {
      const messageData = JSON.parse(Buffer.from(message.data).toString());
      console.log("Message Data: ", messageData);
      const fromMail = messageData.fromMail;
      const toMail = messageData.to;
      const subject = messageData.subject;
      const id = messageData.id;
      messageCount += 1;

      // Create a link for the user to verify their email
      const url = `<p>
        Please click on the link below to verify your account:
        <a href="https://cloudnativeapp.me/verify?token=${id}">
        https://cloudnativeapp.me/verify?token=${id}
        </a>
        </p>`;
      
      // Send the email to the user
      try {
        const message = mg.messages.create(DOMAIN, {
            from: fromMail,
            to: toMail,
            subject: subject,
            html: url
        })
      } catch (error) {
          console.log(error);
      }

      //Set the expiration date to 2 mins from now
      const expiration = new Date();
      console.log("Expiration Date: ", expiration);

      // Store the expiration date of verification link in the database
      const email = Email.create({
        expiration: expiration,
        token: id
      });
  
      // "Ack" (acknowledge receipt of) the message
      message.ack();
    };
  
    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);
  
    // Wait a while for the subscription to run. (Part of the sample only.)
    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);
  }
