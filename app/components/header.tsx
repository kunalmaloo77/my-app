export const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-4 space-y-4 md:space-y-0 ml-4 md:ml-10 mt-4">
      {/* Navigation */}
      <nav className="flex flex-wrap justify-center md:justify-start space-x-4">
        <button className="hover:text-red-500">Music</button>
        <button className="hover:text-red-500">Podcast</button>
        <button className="hover:text-red-500">Live</button>
        <button className="hover:text-red-500">Radio</button>
      </nav>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#2C0000] p-2 rounded text-white w-full md:w-64"
      />
    </header>
  );
};
