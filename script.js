// Replace this with the actual file paths and folder structure
const fileStructure = {
    'folder1': [
        'path/to/folder1/video1.mp4',
        'path/to/folder1/video2.mp4',
    ],
    'folder2': [
        'path/to/folder2/video3.mp4',
        'path/to/folder2/video4.mp4',
    ],
    // Add more folders and file paths as needed
};

const fileList = document.querySelector('.file-list');
const videoPlayer = document.getElementById('video-player');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');

// Function to render the file list based on the current folder
function renderFileList(folder) {
    fileList.innerHTML = '';
    const folderFiles = fileStructure[folder] || [];

    folderFiles.forEach(filePath => {
        const listItem = document.createElement('li');
        listItem.textContent = filePath.split('/').pop(); // Display only the filename
        listItem.addEventListener('click', () => {
            videoPlayer.src = filePath;
            downloadBtn.href = filePath;
        });
        fileList.appendChild(listItem);
    });

    // Add folder navigation links
    const folderNames = Object.keys(fileStructure);
    folderNames.forEach(folderName => {
        const listItem = document.createElement('li');
        listItem.textContent = folderName;
        listItem.addEventListener('click', () => {
            renderFileList(folderName);
        });
        fileList.appendChild(listItem);
    });
}

// Initial render of the file list
renderFileList('folder1');

// Download video
downloadBtn.addEventListener('click', () => {
    if (videoPlayer.src) {
        downloadBtn.href = videoPlayer.src;
        downloadBtn.download = videoPlayer.src.split('/').pop(); // Set the downloaded filename
    } else {
        alert('No video selected to download');
    }
});

// Share video
shareBtn.addEventListener('click', () => {
    if (videoPlayer.src) {
        navigator.share({
            url: videoPlayer.src,
        });
    } else {
        alert('No video selected to share');
    }
});