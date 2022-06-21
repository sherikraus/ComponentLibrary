import {fixture, expect, html, unsafeStatic} from '@open-wc/testing';

const randomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

/**
 * Generates a random string, puts the string in the slot of the element
 * specified and then looks in the shadow root to make sure that string
 * is there.
 * @param {String} elementName
 * @param {String} slotName
 */
export default async function expectSlotWorks(elementName, slotName) {
  elementName = unsafeStatic(elementName);
  const customTitle = randomString();
  const el = await fixture(html`
      <${elementName}>
        <div slot="${slotName}">${customTitle}</div>
      </${elementName}>
    `);

  const root = el.shadowRoot;
  const title = root.querySelector(`slot[name=${slotName}]`);
  expect(title.assignedNodes()[0].textContent).to.contain(customTitle);
};
