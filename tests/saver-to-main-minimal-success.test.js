import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/saver-to-main-minimal-success/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';

describe('saver-to-main-minimal-success', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <saver-to-main-minimal-success></saver-to-main-minimal-success>
    `);

    await expect(el).to.be.accessible();
  });

  it('should show customs lots', async () => {
    await expectSlotWorks('saver-to-main-minimal-success', 'title');
    await expectSlotWorks('saver-to-main-minimal-success', 'sub-title');
    await expectSlotWorks('saver-to-main-minimal-success', 'content-item-one');
    await expectSlotWorks('saver-to-main-minimal-success', 'content-item-two');
    await expectSlotWorks('saver-to-main-minimal-success', 'content-item-three');
  });
});
