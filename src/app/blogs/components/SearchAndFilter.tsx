export default function SearchAndFilter({
  search,
  setSearch,
  categories,
  activeCategory,
  setActiveCategory,
  setVisibleCount,
}: any) {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisibleCount(6);
        }}
        placeholder="Search blog posts..."
        aria-label="Search blog posts"
        className="w-full md:w-1/2 p-3 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 transition 
                   bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      />
      <div className="flex flex-wrap gap-2">
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
