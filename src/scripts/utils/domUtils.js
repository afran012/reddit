function $(selector) {
    const self = {
      htmlElement: document.querySelector(selector),
      htmlAllElements: document.querySelectorAll(selector),
      html: () => self.htmlElement,
      on: (event, callback) => {
        self.htmlElement.addEventListener(event, callback);
      },
      hide: () => {
        self.htmlElement.style.display = "none";
      },
      show: () => {
        self.htmlElement.style.display = "inline";
      },
      attr: (name, value) => {
        if (!self.htmlElement) {
          return console.log("locoo")

        }
        if (value == null) return self.htmlElement.getAttribute(name);
        else self.htmlElement.setAttribute(name, value);
      },
      removeOn: (event, callback) => {
        self.htmlElement.removeEventListener(event, callback);
      },
    };
  
    return self;
  }
  
  export { $ };