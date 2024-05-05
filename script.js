// Folder Navigation
const folderLinks = document.querySelectorAll('.folder-list a');
const videoList = document.querySelector('.video-list');

folderLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const folderUrl = event.target.href;
    const showFolderList = new URLSearchParams(window.location.search).get('showFolderList') === 'true';
    loadFolder(folderUrl, showFolderList);
  });
});

function loadFolder(url, showFolderList) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = function() {
    if (request.status === 200) {
      const parser = new DOMParser();
      const folderContent = parser.parseFromString(request.responseText, 'text/html');
      const contentDiv = document.querySelector('.content');
      contentDiv.innerHTML = folderContent.querySelector('.content').innerHTML;
      initVideoPlayback();
      updateVideoList(folderContent, showFolderList);
    } else {
      console.error('Error loading folder:', request.status);
    }
  };
  request.send();
}

// Update Video List
function updateVideoList(folderContent, showFolderList) {
  const folderListElement = document.querySelector('.folder-list');
  const videoListItems = folderContent.querySelectorAll('.video-item');

  videoList.innerHTML = '';
  videoListItems.forEach(item => {
    const videoItem = document.createElement('div');
    videoItem.classList.add('video-item');
    videoItem.innerHTML = item.innerHTML;
    videoList.appendChild(videoItem);
  });

  if (showFolderList) {
    folderListElement.style.display = 'block';
  } else {
    folderListElement.style.display = 'none';
  }
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
  const shareUrl = `${window.location.origin}${window.location.pathname}?showFolderList=${window.location.search.includes('showFolderList=true') ? 'false' : 'true'}`;

  // Implement share functionality using Web Share API or custom share dialog
  if (navigator.share) {
    navigator.share({
      url: shareUrl
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    alert(`Share this URL: ${shareUrl}`);
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