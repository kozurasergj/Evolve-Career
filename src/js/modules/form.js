export class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так',
    };
    this.path = 'https://dummyjson.com/users/add';
  }

  clearInputs() {
    document.querySelectorAll('input').forEach(input => input.value = '');
  }

  checkMailInputs() {
    const emailInputs = document.querySelectorAll('[type="email"]');
    emailInputs.forEach((input) => {
      input.addEventListener('keypress', (event) => {
        if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
          event.preventDefault();
        }
      });
    });
  };

  initMaskPhone() {

    const setCursorPosition = (position, element) => {
      element.focus();
      if (element.setSelectionRange) {
        element.setSelectionRange(position, position);
      } else if (element.createTextRange) {
        let range = element.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
      }
    }

    const createMask = (event) => {
      let matrix = '+1 (___) ___-____';
      let i = 0;
      let def = matrix.replace(/\D/g, '');
      let val = event.target.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      event.target.value = matrix.replace(/./g, (a) => {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type === 'blur') {
        if (event.target.value.length == 2) {
          event.target.value = '';
        }
      } else {
        setCursorPosition(event.target.value.length, event.target);
      }
    }

    const inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach((input) => {
      input.addEventListener('input', createMask)
      input.addEventListener('focus', createMask)
      input.addEventListener('blur', createMask)
    });
  };

  async postData(url, data) {
    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    if (!request.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }
    return await request.text();
  }

  init() {
    this.checkMailInputs();
    this.initMaskPhone();

    this.forms.forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const statusMessage = document.createElement('div');
        statusMessage.dataset.js = 'js';
        statusMessage.style.cssText = `
        margin-top:15px;
        font-size:18px;
        color:#000;
        `;
        if (!document.querySelector('[data-js="js"]')) {
          form.parentNode.appendChild(statusMessage);
        }
        statusMessage.textContent = this.message.loading;
        const formData = new FormData(form);

        this.postData(this.path, formData)
          .then(response => {
            console.log(response);
            statusMessage.textContent = this.message.success;
          })
          .catch(error => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
          });
      });
    });
  }

}
