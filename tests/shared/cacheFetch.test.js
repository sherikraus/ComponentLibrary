import {expect} from '@open-wc/testing';
import sinon from 'sinon';
import cacheFetch from '../../components/shared/cacheFetch';

describe('cacheFetch()', () => {
  let fetchStub;
  let uri;
  before(() => {
    fetchStub = sinon.stub(window, 'fetch');
    fetchStub.resolves({
      ok: true,
      text: async () => 'we good!',
      json: async () => ({status: 'we good!'}),
    });
  });
  beforeEach(() => {
    fetchStub.resetHistory();
    const noise = Math.floor(Math.random() * 10e5);
    uri = `https://www.example.com/some-uri-${noise}`;
  });
  after(() => {
    fetchStub.restore();
  });
  it('should only fetch URI once', async () => {
    const actual1 = await cacheFetch(uri);
    const actual2 = await cacheFetch(uri);
    expect(fetchStub).to.have.been.callCount(1);
    expect(fetchStub).to.have.been.calledWith(uri);
    expect(actual1).to.equal('we good!');
    expect(actual2).to.equal('we good!');
  });
  it('should use default parser when not given in options', async () => {
    const actualResponse = await cacheFetch(uri, {});
    expect(actualResponse).to.include('we good!');
  });
  it('should custom parse a response', async () => {
    const actualResponse = await cacheFetch(uri, {responseParser: ((res) => res.json())});
    expect(actualResponse).to.include({status: 'we good!'});
  });

  // todo(test): improve testing of Promise rejections.
  //
  // Tried adding chai-as-promised and karma-chai-as-promised for
  // Promise assertion support but setup failed:
  // $   ReferenceError: require is not defined
  // $   at node_modules/chai-as-promised/lib/chai-as-promised.js:3:18
  it('should throw when fetch response is not okay', async () => {
    fetchStub.withArgs(sinon.match(uri)).resolves({
      ok: false,
    });
    let error;
    try {
      await cacheFetch(uri);
    } catch (e) {
      error = e;
    }
    expect(error).to.be.an.instanceOf(Error);
  });
});
