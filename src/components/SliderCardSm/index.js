import {Link} from 'react-router-dom'

import './index.css'

const SliderCardSm = props => {
  const {details} = props
  const {authorName, coverPic, id, title} = details
  return (
    <Link style={{textDecoration: 'none'}} to="/">
      <div className="slider-con">
        <img src={coverPic} alt={title} className="cover-pic-sm" />
        <h1 className="head-sm">{title}</h1>
        <p className="para-sm">{authorName}</p>
        <p className="para-sm">{authorName}</p>
      </div>
    </Link>
  )
}

export default SliderCardSm
