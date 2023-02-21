import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./Pagination.css";

function Pagination(): JSX.Element {

    const [activePage, setActivePage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    return (
        <div className="Pagination">

        </div>
    );
}

export default Pagination;
