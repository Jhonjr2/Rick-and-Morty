import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import './styles/residentCard.css'

const ResidentsCard = ({ url }) => {

  const [resident, getResident] = useFetch(url)
  

  useEffect(() => {
    getResident()
  }, [])

  return (
    
    <article className="resident">
      <header className="resident_header">
        <img className="resident_img" src={resident?.image} alt="" />
        <div className="resident_status">
          <div className={`resident_circle ${resident?.status}`}></div>
          <span className="resident_status_value">{resident?.status}</span>
        </div>
      </header>
      <section className="resident_body">
        <h3 className="resident_name">{resident?.name}</h3>
        <hr className="resident_hr"/>
        <ul className="resident_list">
          <li className="resident_item"><span className="residents_label">Specie</span><span className="residents_value">{resident?.species}</span></li>
          <li className="resident_item"><span className="residents_label">Origin</span><span className="residents_value">{resident?.origin.name}</span></li>
          <li className="resident_item"><span className="residents_label">Eppisodes where appear</span><span className="residents_value">{resident?.episode.length}</span></li>
        </ul>
      </section>
    </article>
  )
}

export default ResidentsCard