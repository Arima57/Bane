
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendData') {
    fetch('http://127.0.0.1:2157/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      sendResponse({success: true, data: data});
    })
    .catch((error) => {
      console.error('Error:', error);
      sendResponse({success: false, error: error.message});
    });
    return true; // Indicates that the response is sent asynchronously
  }
});
