import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PetCard from "../../components/HomeComponents/Petcard";
import { useEffect, useState } from "react";

const PetListing = () => {
    const axiosSecure = useAxiosSecure()
    const [pets, setpets] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("allCategory");
    const [searchItem, setSearchItem] = useState('')

    const { data: allpets = [], refetch, isLoading } = useQuery({
        queryKey: ['allpets',],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-pets')
            const notadopted = res.data.filter(p => p.adopted == false)
            return notadopted
        }
    })

    useEffect(() => {
        if (selectedCategory === "allCategory") {
            setpets(allpets); // Show all pets when "All category" is selected
        } else {
            const categoryBasedData = allpets.filter(e => e.category === selectedCategory);
            setpets(categoryBasedData);
        }
    }, [selectedCategory, allpets]);

    useEffect(() => {

    }, [])

    const filterdItem = pets?.filter(data => data.name.toLowerCase().includes(searchItem.toLowerCase()))
    console.log(filterdItem);

    // console.log(pets);
    return (
        <div className='bg-gray-200 dark:bg-[#3c0040]'>
            <p className='bg-white  py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>Pet Listing</p>
            <div className="flex justify-center items-center gap-3">
                <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#17c3b2] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-200">
                    <div className="flex items-center justify-center fill-white">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width={22} height={22}>
                            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                        </svg>
                    </div>
                    <input type="text" className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
                        onChange={(e) => setSearchItem(e.target.value)} />
                </div>
                <select className="px-3 py-4 rounded-2xl"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value='allCategory' selected >All category</option>
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Horse">Horse</option>
                    <option value="Fish">Fish</option>
                    <option value="Others">Others</option>
                </select>

            </div>
            <div className='container mx-auto pt-10 pb-10'>
                <p className="text-4xl text-center text-red-800">
                    {
                        filterdItem.length == 0 ? 'No pet available..' : ''
                    }
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {
                        filterdItem.map(pet => <PetCard key={pet._id} details={pet}></PetCard>)
                    }

                </div>
            </div>
        </div >
    );
};

export default PetListing;