import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse justify-between items-center text-left w-full px-8 border-t'>
      <div>
        <img src={assets.logo} alt='logo' className='w-20 md:block hidden' />
        <div className='md:block hidden h-7 w-px bg-gray-500/60'>
          <p>Copyright 2025 </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
