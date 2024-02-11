import axios from 'axios'
import {useEffect, useState} from 'react'

export default function UserHome() {
  const [todos, setTodos] = useState([])


  return (
    <>
    <div>UserHome</div>
    { JSON.stringify(todos)}
    </>
  )
}
