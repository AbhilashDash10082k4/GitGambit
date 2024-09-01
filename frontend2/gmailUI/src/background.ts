import { google } from 'googleapis';

// Define the type for the request object
interface MessageRequest {
  action: string;
  token?: string;
}

chrome.runtime.onMessage.addListener(
  (request: MessageRequest, _sender: chrome.runtime.MessageSender, sendResponse: (response: unknown) => void) => {
    if (request.action === 'listMessages' && request.token) {
      const listMessages = async (token: string) => {
        try {
          const gmail = google.gmail({ version: 'v1', auth: token });
          const res = await gmail.users.messages.list({ userId: 'me' });
          console.log(res.data.messages);

          // Send the response back with the list of messages
          sendResponse({ success: true, messages: res.data.messages });
        } catch (error) {
          // Explicitly assert that error is an instance of Error to access the message
          if (error instanceof Error) {
            console.error('Error fetching messages:', error.message);
            sendResponse({ success: false, error: error.message });
          } else {
            sendResponse({ success: false, error: 'An unknown error occurred' });
          }
        }
      };

      // Call the asynchronous function
      listMessages(request.token);

      // Return true to indicate that the response is sent asynchronously
      return true;
    }
  }
);
