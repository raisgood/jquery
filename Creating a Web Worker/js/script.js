// Sample worker script
// The script executes immediately on load
// Nearly any content can passed between the page and the worker script
// This simple demonstration just uses strings

// Worker has one event called message
// Message passes one object, with a data property
// The data property has the payload of the sent message
// Again, in our case, that will be a string

self.addEventListener('message', function (e) {
// recieve messages from page
var message = e.data;

// send message to page
// The simple logic just echoes the string back to the caller
self.postMessage(e.data + ' - Processed!');
});

// There is no architecture for events like onReady
// However, you can implement one on your relatively easily

self.postMessage('READY');

