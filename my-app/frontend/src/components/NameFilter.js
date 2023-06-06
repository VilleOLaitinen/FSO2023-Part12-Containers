const NameFilter = ({ filter, handleFilterChange }) => {

    return (
        <>
            <label htmlFor="filter">filter shown with</label>
            <input id="filter" value={filter} onChange={handleFilterChange} />
        </>
    )
}

export default NameFilter