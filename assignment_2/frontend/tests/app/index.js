import initApp from '../../src/main.js';
let calledInnerHTML = 0;

describe('Logged out state', () => {
  before(function(done) {
    (function() {
      // Store the original "hidden" getter and setter functions from Element.prototype
      // using Object.getOwnPropertyDescriptor
      const originalSet = Object.getOwnPropertyDescriptor(
        Element.prototype,
        'innerHTML'
      ).set;

      Object.defineProperty(Element.prototype, 'innerHTML', {
        set: function(value) {
          // u been a baaaaahd boy
          calledInnerHTML++;
          return originalSet.call(this, value);
        },
      });
    })();

    this.$root = document.createElement('div');
    this.$root.id = 'root';
    document.body.appendChild(this.$root);

    // seed app
    initApp('http://localhost:5000');

    // provide a small delay for boot
    setTimeout(done, 10000);
  });

  after(function() {
    document.body.removeChild(this.$root);
    delete this.$root;
  });

  describe('#feed', function() {
    // verify what the endpoint returns
    before(function() {
      this.children = document.querySelectorAll('#feed *[data-id-post]');

      return fetch('http://localhost:5000/post/public')
        .then(data => data.json())
        .then(({ posts }) => {
          this.posts = posts;
        });
    });

    it('posts are correctly populated with correct data attribute', function() {
      expect(this.children).to.have.lengthOf(this.posts.length);
      describe('posts', () => {
        this.children.forEach((node, index) => {
          describe(`post no.${index}`, () => {
            it(`has the correct title (${this.posts[index].title})`, () => {
              const post = node.querySelector('*[data-id-title]');
              expect(post.innerText).to.include(this.posts[index].title);
            });

            it('has the correct author', () => {
              const post = node.querySelector('*[data-id-author]');
              expect(post.innerText).to.include(this.posts[index].meta.author);
            });

            it(`has ${this.posts[index].meta.upvotes.length} upvotes`, () => {
              const post = node.querySelector('*[data-id-upvotes]');
              expect(post.innerText).to.include(
                this.posts[index].meta.upvotes.length
              );
            });
          });
        });
      });
    });

    it('called innerHTML more than once', () => {
      expect(calledInnerHTML).to.equal(0);
    });

    it('called innerHTML < 10 times', () => {
      expect(calledInnerHTML).to.be.lessThan(10);
    });
  });

  describe('#nav', () => {
    it('search bar exists', () => {
      const post = document.querySelector('input[data-id-search]');
      expect(post).to.not.be.null;
    });

    it('login button exists', () => {
      const post = document.querySelector('button[data-id-login]');
      expect(post).to.not.be.null;
    });

    it('signup button exists', () => {
      const post = document.querySelector('button[data-id-signup]');
      expect(post).to.not.be.null;
    });
  });
});
