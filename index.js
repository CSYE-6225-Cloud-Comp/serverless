import { cloudEvent as _cloudEvent } from '@google-cloud/functions-framework';
import { listenForMessages } from './readMessages.js';

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
_cloudEvent('sendEmailPubSub', cloudEvent => {
  listenForMessages('verify_mail_subscription', 60);
});
