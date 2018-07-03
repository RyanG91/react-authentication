import React from 'react'
import { api, setJwt } from '../api/init'


function Bookmark (props) {
  const { _id, title, url, remove } = props
  return (
    <li>
      {title} (<a href={url} target="_blank">Visit</a>)
      <button onClick={ () => remove(_id) }>Delete!</button>
    </li>
  )
}

export default Bookmark
