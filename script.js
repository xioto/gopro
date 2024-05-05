// Replace this with the actual file paths
const filePaths = [
    'path/to/video1.mp4',
    'path/to/video2.mp4',
    'path/to/video3.mp4',
    // Add more file paths as needed
];

const fileList = document.querySelector('.file-list');
const videoPlayer = document.getElementById('video-player');
const downloadBtn = document.getElementById('download-btn');

// Populate the file list
filePaths.forEach(filePath => {
    const listItem = document.createElement('li');
    listItem.textContent = filePath.split('/').pop(); // Display only the filename
    listItem.addEventListener('click', () => {
        videoPlayer.src = filePath;
        downloadBtn.href = filePath;
    });
    fileList.appendChild(listItem);
});

// Download video
downloadBtn.addEventListener('click', () => {
    if (videoPlayer.src) {
        downloadBtn.href = videoPlayer.src;
        downloadBtn.download = videoPlayer.src.split('/').pop(); // Set the downloaded filename
    } else {
        alert('No video selected to download');
    }
});
