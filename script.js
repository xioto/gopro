// Folder Navigation
const folderLinks = document.querySelectorAll('.folder-list a');

folderLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const folderUrl = event.target.href;
    loadFolder(folderUrl);
  });
});

function loadFolder(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = function() {
    if (request.status === 200) {
      const parser = new DOMParser();
      const folderContent = parser.parseFromString(request.responseText, 'text/html');
      const contentDiv = document.querySelector('.content');
      contentDiv.innerHTML = folderContent.querySelector('.content').innerHTML;
      initVideoPlayback();
    } else {
      console.error('Error loading folder:', request.status);
    }
  };
  request.send();
}

// Video Playback
function initVideoPlayback() {
  const videoElements = document.querySelectorAll('video');

  videoElements.forEach(video => {
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
}

// Share and Download Buttons
const shareButtons = document.querySelectorAll('.share-btn');
const downloadButtons = document.querySelectorAll('.download-btn');

shareButtons.forEach(button => {
  button.addEventListener('click', shareVideo);
});

downloadButtons.forEach(button => {
  button.addEventListener('click', downloadVideo);
});

function shareVideo(event) {
  const videoElement = event.target.closest('.video-item').querySelector('video');
  const videoUrl = videoElement.src;
  // Implement share functionality using Web Share API or custom share dialog
  if (navigator.share) {
    navigator.share({
      url: videoUrl
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    alert(`Share this video: ${videoUrl}`);
  }
}

function downloadVideo(event) {
  const videoElement = event.target.closest('.video-item').querySelector('video');
  const videoUrl = videoElement.src;
  const downloadLink = document.createElement('a');
  downloadLink.href = videoUrl;
  downloadLink.download = 'video.mp4'; // Set the desired filename
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Initialize
initVideoPlayback();