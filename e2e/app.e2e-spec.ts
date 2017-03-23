import { PinboardPage } from './app.po';

describe('pinboard App', () => {
  let page: PinboardPage;

  beforeEach(() => {
    page = new PinboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
