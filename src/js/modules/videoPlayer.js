export class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay?.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      const blockedElem = btn.closest('.module__video-item')?.nextElementSibling;
      if (i % 2 === 0) {
        blockedElem?.setAttribute('data-disabled', 'true');
      }
      btn.addEventListener('click', () => {
        if (btn?.closest('.module__video-item')?.getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';
            if (this.path !== btn.getAttribute('[data-url]')) {
              this.path = btn.getAttribute('[data-url]');
              this.player.loadVideoById({ videoId: this.path });
            }
          } else {
            this.pash = btn.getAttribute('data-url');
            this.createPlayer(this.pash);
          }
        }
      });
    });
  }

  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }

  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
    this.overlay.style.display = 'flex'
  }

  onPlayerStateChange(state) {
    const blockedElem = this.activeBtn.closest('.module__video-item')?.nextElementSibling;
    const textPlayCircle = blockedElem.querySelector('.play__text');
    const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
    const playCircleVideo = blockedElem.querySelector('.play__circle');
    if ((state.data === 0) && (playCircleVideo.classList.contains('closed'))) {
      playCircleVideo.classList.remove('closed');
      blockedElem.querySelector('svg').remove();
      playCircleVideo.appendChild(playBtn);
      textPlayCircle.textContent = 'Play video';
      textPlayCircle.classList.remove('.attention');
      blockedElem.style.opacity = 1;
      blockedElem.style.filter = 'none';
      blockedElem?.setAttribute('data-disabled', 'false');
    }
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.querySelectorAll('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindClose();
    }
  }
}
