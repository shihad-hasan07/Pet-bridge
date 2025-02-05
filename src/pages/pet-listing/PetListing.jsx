import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PetCard from "../../components/HomeComponents/Petcard";

const PetListing = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allpets = [], refetch, isLoading } = useQuery({
        queryKey: ['allpets',],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-pets')
            const notadopted=res.data.filter(p=>p.adopted==false)
            return notadopted
        }
    })
    
    return (
        <div className='bg-gray-200 dark:bg-[#3c0040]'>
            <p className='bg-white  py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>Pet Listing</p>

            <div className='container mx-auto pt-10'>
                <div className="grid grid-cols-3 gap-10">
                    {
                        allpets.map(pet => <PetCard key={pet._id} details={pet}></PetCard>)
                    }

                </div>
            </div>
        </div>
    );
};

export default PetListing;