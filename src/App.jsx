import { useEffect, useRef, useState } from 'react'
import './App.css'
import LocationCard from './components/LocationCard'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import ResidentsCard from './components/ResidentsCard'
import Pagination from './components/Pagination'
import './components/styles/form.css'
import './components/styles/Error.css'


function App() {


  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState()
  const url = `https://rickandmortyapi.com/api/location/${inputValue || locationId}`
  const [location, getLocation, hasError] = useFetch(url)
  const [residentPerPage, setResidentPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)

  const totalResidents = location?.residents.length
  const lasIndex = currentPage * residentPerPage
  const firstIndex = lasIndex - residentPerPage


  useEffect(() => {
    getLocation()
  }, [inputValue])


  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }


  const inputLimit = useRef()


  const handleResident = e => {
    e.preventDefault()
    const inputValue = inputLimit.current.value
    setResidentPerPage(inputValue)
    setCurrentPage(1)

  }

  return (
    <div>
      <div>
        <img className='img_header' src="./img-header.png" alt="img-header" />
        <form className='form' onSubmit={handleSubmit}>
          <input className='input' ref={inputLocation} type="text" />
          <button className='input_btn'>Search</button>
        </form>
        <form className='form' onSubmit={handleResident}>
          <input className='input' ref={inputLimit} type="text" />
          <button className='input_btn'>Limit</button>
        </form>
      </div>
      {
        hasError
          ? <div className='container_err'>
            <img className='img_error' src="./404error.png" alt="img_error" />
            <h2 className='text_err'>⚠️ "{inputValue}" not found ❌, you must provide an ID from 1 to 126 fabian </h2>
          </div>
          : (
            <>
              <LocationCard
                location={location}
              />
              <div className='resident__container'>
                {
                  location?.residents.map(url => (
                    <ResidentsCard
                      key={url}
                      url={url}
                    />
                  )).slice(firstIndex, lasIndex)
                }
              </div>
              <Pagination
                residentPerPage={residentPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalResidents={totalResidents}
              />
            </>
          )
      }

    </div>
  )
}

export default App
