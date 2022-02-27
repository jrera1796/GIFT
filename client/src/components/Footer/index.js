import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        &copy;{new Date().getFullYear()} by
        <a href="https://github.com/kcheykim" className='has-text-white'> Kosal Cheykim</a>,
        <a href="https://github.com/mockcomic"className='has-text-white'> Kurtis Hight</a>,
        <a href="https://github.com/jrera1796"className='has-text-white'> Jose Rivera</a>,
        <a href="https://github.com/ricky0320"className='has-text-white'> Ching Leung</a>
      </div>
    </footer>
  );
};

export default Footer;
