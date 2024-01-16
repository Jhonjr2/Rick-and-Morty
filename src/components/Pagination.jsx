

const Pagination = ({ residentPerPage, currentPage, setCurrentPage, totalResidents }) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalResidents / residentPerPage); i++) {
        pageNumbers.push(i)
    }

    const onPreviusPage = () => {
        setCurrentPage(currentPage - 1)
        scrollToTop();
    }
    const onNextPage = () => {
        setCurrentPage(currentPage + 1)
        scrollToTop();
    }
    const onSpecificPage = (n) => {
        setCurrentPage(n)
        scrollToTop();
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };


    return (
        <div className='pagination_container'>
            <nav className="pagination is-rounded pb-5 pt-6 mt-6" role="navigation" aria-label="pagination">
                <button
                    className={`pagination-previous ml-6 ${currentPage === 1 ? 'is-disabled' : ''}`}
                    onClick={onPreviusPage}
                    style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}>
                    Previous
                </button>
                <button
                    className={`pagination-next mr-6 ${currentPage >= pageNumbers.length ? 'is-disabled' : ''}`}
                    onClick={onNextPage}
                    style={{ pointerEvents: currentPage >= pageNumbers.length ? 'none' : 'auto' }}>
                    Next
                </button>
                <ul className="pagination-list ml-6 pl-6">
                    {
                        pageNumbers.map(noPage => (
                            <li key={noPage}>
                                <a
                                    className={`pagination-link ${noPage === currentPage ? 'is-current' : ''}`} 
                                    onClick={() => onSpecificPage(noPage)}>{noPage}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>


    )
}

export default Pagination