import './index.css'

import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

const ShelfCard = props => {
  const {details} = props
  const {id, coverPic, title, authorName, rating, readStatus} = details
  return (
    <li>
      <Link style={{textDecoration: 'none'}} to={`/books/${id}`}>
        <div className="shelf-card">
          <img alt={title} src={coverPic} className="cover-shelf-card" />
          <div className="content-con">
            <h1 className="head-card">{title}</h1>
            <p className="para-card">{authorName}</p>
            <p className="para-card">
              Avg Rating <BsFillStarFill className="star" />
              {rating}
            </p>
            <p>Status</p>
            <p className="para">{readStatus}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default ShelfCard
