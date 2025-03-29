// Get references to HTML elements
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const statusMessage = document.getElementById('status-message');
const videoElement = document.getElementById('video');
let mediaStream = null;

// Function to start the camera
async function startCamera() {
    try {
        // Try to access the webcam
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Set the video source to the webcam stream
        videoElement.srcObject = mediaStream;

        // Change status message and buttons state
        statusMessage.textContent = 'Status: Camera is active';
        startButton.disabled = true;
        startButton.classList.add('disabled');
        stopButton.disabled = false;
        stopButton.classList.remove('disabled');
    } catch (error) {
        // If an error occurs (e.g., no camera or permission denied), show error message
        statusMessage.textContent = 'Status: Camera is not available';
        console.error('Error accessing camera:', error);
    }
}

// Function to stop the camera
function stopCamera() {
    if (mediaStream) {
        // Stop all tracks of the media stream to stop the video feed
        mediaStream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;

        // Reset status message and buttons state
        statusMessage.textContent = 'Status: Waiting for user to start the camera.';
        startButton.disabled = false;
        startButton.classList.remove('disabled');
        stopButton.disabled = true;
        stopButton.classList.add('disabled');
    }
}

// Event listeners for buttons
startButton.addEventListener('click', startCamera);
stopButton.addEventListener('click', stopCamera);