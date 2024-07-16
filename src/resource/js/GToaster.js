class GToaster {
  #timer = 3000;
  #position = 'bottom-right';

  constructor() {
    document.addEventListener('gtoast', (event) => {
      this.toast(event.detail.type, event.detail.message);
    });
  }

  static create() {
    if (!GToaster.instance) {
      GToaster.instance = new GToaster();
    }

    return GToaster.instance;
  }

  toast(type, message) {
    this.#setPosition();
    const randomKey = crypto.randomUUID();

    let x = document.getElementById('g-toaster');

    x.innerHTML += this.#getToasterContent(randomKey, message, type);

    setTimeout(() => document.getElementById(`g-toaster-${randomKey}`)?.remove(), this.#timer);
  }

  setParams(params) {
    this.#timer = params?.timer || this.#timer;
    this.#position = params?.position || this.#position;
  }

  #setPosition() {
    const x = document.getElementById('g-toaster');

    switch (this.#position) {
      case 'top-right':
        x.style.top = '15px';
        x.style.right = '15px';
        x.style.bottom = 'auto';
        x.style.left = 'auto';
        break;
      case 'top-left':
        x.style.top = '15px';
        x.style.left = '15px';
        x.style.bottom = 'auto';
        x.style.right = 'auto';
        break;
      case 'bottom-right':
        x.style.bottom = '15px';
        x.style.right = '15px';
        x.style.top = 'auto';
        x.style.left = 'auto';
        break;
      case 'bottom-left':
        x.style.bottom = '15px';
        x.style.left = '15px';
        x.style.top = 'auto';
        x.style.right = 'auto';
        break;
      default:
        x.style.bottom = '15px';
        x.style.right = '15px';
        x.style.top = 'auto';
        x.style.left = 'auto';
        break;
    }
  }

  #getToasterColor(type) {
    return {
      success: '#4CAF50',
      warning: '#FFA500',
      info: '#2196F3',
      error: '#F44336',
    }[type];
  }

  #getToasterSvg(type) {
    return {
      success: `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 rounded-lg dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
    `,
      warning: `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 rounded-lg dark:text-orange-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span class="sr-only">Warning icon</span>
      </div>
    `,
      info: `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 rounded-lg dark:text-blue-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span class="sr-only">Info icon</span>
      </div>
    `,
      error: `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 rounded-lg dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
      </div>
    `,
    }[type];
  }

  #getToasterContent(key, text, type) {
    return `
     <div 
      id="g-toaster-${key}" 
      class="dark:text-gray-400 dark:bg-gray-800"
      style="
        cursor: pointer;
        margin: 5px;
        display: flex;
        align-items: center;
        padding: 15px;
        border-radius: 10px;
        min-width: 250px;
        box-shadow: rgb(17 24 39) 1px 1px 3px;
      " 
      role="alert"
      onclick="document.getElementById('g-toaster-${key}').remove();"
      >
        ${this.#getToasterSvg(type)}
        <div class="text-sm font-normal" class="g-toaster-text" style="width:100%; color: ${this.#getToasterColor(type)}; text-align: center;">${text}</div>
      </div>
    `;
  }
}

export default GToaster.create();
