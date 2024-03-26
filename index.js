// const functions = require('@google-cloud/functions-framework');
import functions from '@google-cloud/functions-framework';
import Email from './src/models/email.js';

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent('sendEmailPubSub', cloudEvent => {
  // The Pub/Sub message is passed as the CloudEvent's data payload.
  const base64name = cloudEvent.data.message.data;

  // Get the published message
  const data = base64name
    ? Buffer.from(base64name, 'base64').toString()
    : '';

    // Get token from data

  
    // Set the expiration date to 2 mins from now
    const expiration = new Date() + 2 * 60 * 1000;

    const email = Email.create({ 
      expiration: expiration, 
      token: data.token 
    });

    // Send verification email to the user
    sendMail(data.from, data.to, data.subject, data.text, data.html);


});
