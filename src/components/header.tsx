const Header = ({
  selectedIndex,
  opacity,
}: {
  selectedIndex: any;
  opacity: any;
}) => {
  return (
    <div className={`fixed w-full z-20 top-0 left-0 ${opacity} h-20`}></div>
  );
};

export default Header;
