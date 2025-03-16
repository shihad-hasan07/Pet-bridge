import { useQuery } from "@tanstack/react-query";
import PetCard from "../../components/HomeComponents/Petcard";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";

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
        <div className="bg-gray-200 dark:bg-[#181818] min-h-[calc(100vh-393px)]">
            <p className="py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center text-gray-800 dark:text-white">
                🐾 Pet Listing
            </p>

            {/* Search & Category Filters */}
            <div className="flex flex-row md:flex-row justify-center items-center gap-4 mt-6">
                {/* Search Bar */}
                <div className="p-4 w-[60px] md:w-[270px] bg-[#17c3b2] dark:bg-[#0ea5e9] shadow-lg rounded-full flex items-center transition-all duration-300 hover:w-[270px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} className="text-white">
                        <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search pets..."
                        className="ml-3 outline-none text-lg bg-transparent w-full text-white font-normal placeholder-gray-200"
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </div>

                <select
                    className="px-4 py-4 rounded-xl border dark:border-gray-600 text-gray-800 dark:text-white bg-white dark:bg-[#222] shadow-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="allCategory">All Categories</option>
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Horse">Horse</option>
                    <option value="Fish">Fish</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            {/* Pet Listing Section */}
            <div className="container mx-auto pt-8 pb-10">
                {
                    filteredItems.length === 0 && (
                        <p className="text-4xl text-center text-red-800">No pets available...</p>)
                }
                {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6"> */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-14 sm:px-2 md:px-2 lg:px-4 mt-6 ">
                    {
                        filteredItems.map((pet) => (
                            <PetCard key={pet._id} details={pet} />))
                    }
                </div>
            </div>
        </div>
    );
};

export default PetListing;
