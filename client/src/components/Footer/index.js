import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        &copy;{new Date().getFullYear()} by
        <a href="https://github.com/kcheykim"> Kosal Cheykim</a>,
        <a href="https://github.com/mockcomic"> Kurtis Hight</a>,
        <a href="https://github.com/jrera1796"> Jose Rivera</a>,
        <a href="https://github.com/ricky0320"> Ching Leung</a>
      </div>
    </footer>
  );
};

export default Footer;
