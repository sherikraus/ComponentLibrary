export default function(shadowRoot) {
  if (shadowRoot) {
    const elements = shadowRoot.querySelectorAll('.auro-select');
    elements.forEach((element) => {
      const child = [...element.children].filter(
          (child) => child.localName === 'auro-menu',
      )[0];

      child.style.overflow = 'scroll';
      child.style.height = '25vh';
    });
  }
}
