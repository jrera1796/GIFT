import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container columns">
        <div className='column has-text-white'>
          &copy;{new Date().getFullYear()}
        </div>
        <div className='column'>

          <a href="https://github.com/kcheykim" target="_blank" rel='noreferrer' noopener><button
            className="button btn is-info"
            data-testid="button"
            type="submit"
          >
            Kosal Cheykim
          </button></a>

          <a href="https://github.com/mockcomic" target="_blank" rel='noreferrer' noopener><button
            className="button btn is-info"
            data-testid="button"
            type="submit"
          >
            Kurtis Hight
          </button></a>

          <a href="https://github.com/jrera1796" target="_blank" rel='noreferrer' noopener><button
            className="button btn is-info"
            data-testid="button"
            type="submit"
          >
            Jose Rivera
          </button></a>

          <a href="https://github.com/ricky0320" target="_blank" rel='noreferrer' noopener><button
            className="button btn is-info"
            data-testid="button"
            type="submit"
          >
            Ching Leung
          </button></a>

          </div>
        </div>

    </footer>
  );
};

export default Footer;
