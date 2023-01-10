import './index.css'

import {Link} from 'react-router-dom'

const SliderCard = props => {
  const {details} = props
  const {authorName, coverPic, id, title} = details
  return (
    <li>
      <Link style={{textDecoration: 'none'}} to={`/books/${id}`}>
        <div className="slider-con">
          <img src={coverPic} alt={title} className="cover-pic" />
          <h1 className="head">{title}</h1>
          <p className="para">{authorName}</p>
          <h1 className="para">{authorName}</h1>
        </div>
      </Link>
    </li>
  )
}

export default SliderCard
