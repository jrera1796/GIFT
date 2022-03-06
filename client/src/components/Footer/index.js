import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-2 footer-container">


        <div className='is-1 has-text-white'>
          <h5 className='has-text-centered'>&copy;{new Date().getFullYear()}</h5>
          <div className='has-text-centered footer-btn'>
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
        {/* <div className='is-4 has-text-white footer-button'>


        </div> */}


    </footer>
  );
};

export default Footer;
