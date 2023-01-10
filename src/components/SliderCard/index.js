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
          <h1 className="heading">{title}</h1>
          <p className="paragraph">{authorName}</p>
        </div>
      </Link>
    </li>
  )
}

export default SliderCard
