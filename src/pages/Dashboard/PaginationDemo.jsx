import { useState, useEffect } from "react";

const PaginationDemo = () => {
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 2; // Number of pets per page

    useEffect(() => {
        fetch(`http://localhost:5000/all-pets?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setPets(data.pets);
                setTotalPages(data.totalPages);
            })
            .catch((err) => console.error(err));
    }, [page]);

    return (
        <div>
            <h2>Paginated Pets List</h2>
            <ul>
                {pets.map((pet) => (
                    <li key={pet._id}>
                        <h3>{pet.name}</h3>
                        <p>{pet.category}</p>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
            </button>
            <span> Page {page} of {totalPages} </span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next
            </button>
        </div>
    );
};

export default PaginationDemo;
