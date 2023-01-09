import './index.css'

import {Link} from 'react-router-dom'

const SliderCard = props => {
  const {details} = props
  const {authorName, coverPic, id, title} = details
  return (
    <Link style={{textDecoration: 'none'}} to={`/books/${id}`}>
      <div className="slider-con">
        <img src={coverPic} alt={title} className="cover-pic" />
        <h1 className="head">{title}</h1>
        <p className="para">{authorName}</p>
        <p className="para">{authorName}</p>
      </div>
    </Link>
  )
}

export default SliderCard
