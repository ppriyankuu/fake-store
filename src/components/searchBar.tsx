import { useProductStore } from "../store/useProductStore";

export default function SearchBar() {
    const {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        resetFilters,
    } = useProductStore();

    const handleReset = () => {
        setSearchTerm("");
        resetFilters(); // assumes this resets category to "All"
    };

    return (
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            {/* Search Input */}
            <div className="flex-1 max-w-md w-full">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="e.g. phone, jewelry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Category Select */}
            <div className="w-full sm:w-48">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <select
                    id="category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option value={category} key={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reset Button */}
            {(searchTerm || selectedCategory !== "All") && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                >
                    Reset filters
                </button>
            )}
        </div>
    );
}