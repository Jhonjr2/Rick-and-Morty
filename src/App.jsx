import { useEffect, useRef, useState } from 'react'
import './App.css'
import LocationCard from './components/LocationCard'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import ResidentsCard from './components/ResidentsCard'
import './components/styles/Error.css'
import Pagination from './components/Pagination'

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

  console.log(totalResidents);




  useEffect(() => {
    getLocation()
  }, [inputValue])


  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }

  return (
    <div>
      <img className='img_header' src="./img-header.png" alt="img-header" />
      <form className='form' onSubmit={handleSubmit}>
        <input className='input' ref={inputLocation} type="text" />
        <button className='input_btn'>Search</button>
      </form>
      {
        hasError
          ? <div className="background-img">
            <div className="space"></div>
            <div className="wrapper">
              <div className="img-wrapper">
                <span>44</span>
              </div>
              <h2 className='text_err'>⚠️ "{inputValue}" not found ❌, you must provide an ID from 1 to 126 </h2>
            </div>
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
