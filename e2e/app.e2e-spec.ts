import { RoosterPage } from './app.po';

describe('rooster App', function() {
  let page: RoosterPage;

  beforeEach(() => {
    page = new RoosterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
