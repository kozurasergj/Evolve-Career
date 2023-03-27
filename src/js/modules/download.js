export class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'src/assets/img/mainbg.jpg';
  }

  downloadPhoto(path) {
    const link = document.createElement('a');
    link.setAttribute('href', path)
    link.setAttribute('download', 'nice__picture')
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.downloadPhoto(this.path);
      });
    });
  }
}
