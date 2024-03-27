import { cloudEvent as _cloudEvent } from '@google-cloud/functions-framework/build/src/function_registry.js';
import { readMessages } from './readMessages.js';

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
_cloudEvent('sendEmailPubSub', cloudEvent => {
  listenForMessages('verify_email_subscription', 60);
});
