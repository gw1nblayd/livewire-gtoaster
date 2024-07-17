class GToaster {
  #style = 'flat'; // flat, blank
  #theme = 'dark';
  #showIcons = true;
  #timer = 3000;
  #position = 'bottom-right';
  #animation = 'none';

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

    this.#animate(randomKey);

    setTimeout(() => document.getElementById(`g-toaster-${randomKey}`)?.remove(), this.#timer);
  }

  setParams(params) {
    this.#timer = params?.timer || this.#timer;
    this.#position = params?.position || this.#position;

    this.#showIcons = params?.showIcons ?? this.#showIcons;
    this.#theme = params?.theme || this.#theme;
    this.#style = params?.style || this.#style;
    this.#animation = params?.animation || this.#style;
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

  #getFlatColor(type) {
    return (
      this.#theme === 'dark' ? {
        success: '#17a34a',
        error: '#dc2625',
        warning: '#ca8a03',
        info: '#2463eb',
      } : {
        success: '#22c55d',
        error: '#ef4444',
        warning: '#ebb305',
        info: '#3c82f6',
      }
    )[type];
  }

  #getBlankColor() {
    return this.#theme === 'dark' ? '#1F2937' : '#F9FAFB';
  }

  #getToasterSvg(type) {
    if (!this.#showIcons) {
      return '';
    }

    return {
      success: `
      <div style="display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 3px">
        <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
    `,
      warning: `
      <div style="display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 3px;">
        <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <span class="sr-only">Warning icon</span>
      </div>
    `,
      info: `
      <div style="display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 3px;">
        <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
        <span class="sr-only">Info icon</span>
      </div>
    `,
      error: `
      <div style="display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 3px;">
        <svg style="width: 1.25rem; height: 1.25rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
      style="
        color: ${this.#style === 'flat' ? '#fff' : this.#getFlatColor(type)};
        cursor: pointer;
        margin: 5px;
        padding: 15px;
        border-radius: 10px;
        min-width: 250px;
        box-shadow: rgb(17 24 39) 1px 1px 3px;
        background-color: ${this.#style === 'flat' ? this.#getFlatColor(type) : this.#getBlankColor()};
        transition: all 0.3s ease;
      " 
      role="alert"
      onclick="document.getElementById('g-toaster-${key}').remove();"
      >
        <div
          style="
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
          "
        >
          ${this.#getToasterSvg(type)}
          <div 
            class="g-toaster-text" 
            style="
              width:100%; 
              text-align: center;
            "
          >
            ${text}
          </div>
        </div>
      </div>
    `;
  }

  #animate(randomKey) {
    switch (this.#animation) {
      case 'fade':
        document.getElementById(`g-toaster-${randomKey}`).style.opacity = '0';

        setTimeout(
          () => document.getElementById(`g-toaster-${randomKey}`).style.opacity = '1',
          50
        );
        break;
      default:
        break;
    }
  }
}

export default GToaster.create();
