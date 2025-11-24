import { useProductStore } from "../store/useProductStore";

export default function Pagination() {
    const { filteredProducts, currentPage, itemsPerPage, setCurrentPage } = useProductStore();

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-center gap-2 mt-6">
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}