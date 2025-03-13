const SearchBar = () => {
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    // Add your search logic here
  };

  return (
    <section className="search-container">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search your knowledge base..."
        onChange={handleSearch}
      />
    </section>
  );
};

export default SearchBar;
