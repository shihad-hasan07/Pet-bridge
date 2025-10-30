import { useQuery } from "@tanstack/react-query";
import PetCard from "../../components/HomeComponents/Petcard";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";
import { FaSearch, FaFilter, FaPaw } from 'react-icons/fa';

const PetListing = () => {
    const axiosPublic = useAxiosPublic();
    const [pets, setPets] = useState([]);

    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get("category") || "allCategory";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchItem, setSearchItem] = useState("");

    const { data: allpets = [], refetch, isLoading } = useQuery({
        queryKey: ["allpets"],
        queryFn: async () => {
            const res = await axiosPublic.get("/all-nonAdopted-pets");
            return res.data;
        },
    });

    useEffect(() => {
        const sortedPets = allpets.sort((a, b) => new Date(b.petAddTime) - new Date(a.petAddTime));

        if (selectedCategory === "allCategory") {
            setPets(sortedPets);
        } else {
            setPets(sortedPets.filter((e) => e.category === selectedCategory));
        }
    }, [selectedCategory, allpets]);

    const filteredItems = pets.filter((data) =>
        data.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    if (isLoading)
        return (
            <p className="min-h-[calc(100vh-393px)]">
                <Loading />
            </p>
        );

    return (
        <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[calc(100vh-393px)]">
            {/* Hero Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 shadow-lg">
                <div className="container mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaPaw className="text-white text-3xl sm:text-4xl" />
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            Pet Listing
                        </h1>
                    </div>
                    <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
                        Find your perfect companion and give them a loving home
                    </p>
                    
                    {/* Pet Count Badge */}
                    <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                        <span className="text-white font-semibold text-sm sm:text-base">
                            {filteredItems.length} Pet{filteredItems.length !== 1 ? 's' : ''} Available
                        </span>
                    </div>
                </div>
            </div>

            {/* Search & Filter Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 w-full">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search pets by name..."
                                    className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base transition-all duration-300"
                                    onChange={(e) => setSearchItem(e.target.value)}
                                    value={searchItem}
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="w-full lg:w-auto">
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                                    <FaFilter className="text-blue-600 dark:text-blue-400" size={18} />
                                </div>
                                <select
                                    className="flex-1 lg:flex-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="allCategory">All Categories</option>
                                    <option value="Cat">🐱 Cat</option>
                                    <option value="Dog">🐶 Dog</option>
                                    <option value="Rabbit">🐰 Rabbit</option>
                                    <option value="Horse">🐴 Horse</option>
                                    <option value="Fish">🐠 Fish</option>
                                    <option value="Others">🐾 Others</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(searchItem || selectedCategory !== "allCategory") && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                            {searchItem && (
                                <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                                    Search: "{searchItem}"
                                    <button onClick={() => setSearchItem("")} className="hover:text-blue-900 dark:hover:text-blue-100">×</button>
                                </span>
                            )}
                            {selectedCategory !== "allCategory" && (
                                <span className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm">
                                    Category: {selectedCategory}
                                    <button onClick={() => setSelectedCategory("allCategory")} className="hover:text-indigo-900 dark:hover:text-indigo-100">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Pet Cards Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-16 sm:py-20 lg:py-24">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 max-w-md mx-auto">
                            <div className="bg-red-100 dark:bg-red-900/30 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                No Pets Available
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                                {searchItem || selectedCategory !== "allCategory" 
                                    ? "Try adjusting your search or filters" 
                                    : "There are currently no pets available for adoption"}
                            </p>
                            {(searchItem || selectedCategory !== "allCategory") && (
                                <button
                                    onClick={() => {
                                        setSearchItem("");
                                        setSelectedCategory("allCategory");
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
                        {filteredItems.map((pet) => (
                            <PetCard key={pet._id} details={pet} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PetListing;