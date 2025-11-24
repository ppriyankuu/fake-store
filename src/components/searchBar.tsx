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

    return (
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div className="flex-1 max-w-md">
                <label className="block text-sm font-medium mb-1">Search</label>
                <input
                    type="text"
                    placeholder="e.g phone, jewelry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded w-full"
                />
            </div>

            <div className="w-full sm:w-48">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                    className="px-4 py-2 border rounded w-full"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {
                        categories.map((category, idx) => (
                            <option value={category} key={idx}>{category}</option>
                        ))
                    }
                </select>
            </div>

            {(searchTerm || selectedCategory !== 'All') && (

                <button
                    onClick={() => {
                        setSearchTerm('');
                        resetFilters();
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 whitespace-nowrap"
                >
                    Reset filters
                </button>
            )}
        </div>
    );
}