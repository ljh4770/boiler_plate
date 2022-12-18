import  React, { useEffect } from 'react';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth.js"

function LandingPage(props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    Axios("/api/hello") //이 end point 를 서버로 보냄
    .then(response => console.log(response.data)) // response 결과의 data를 출력해서 보내줘
  }, [])

  const onClickHandler = () => {
      Axios.get('/api/users/logout')
      .then(response => {
        console.log(response.data)
        if (response.data.success){
          navigate("/login")
        }
        else {
          alert("Failed to log out.")
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyCondtent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
        <h2>시작페이지</h2>

        <button onClick = {onClickHandler}>
          logout
        </button>
    </div>
  )
}

export default Auth(LandingPage, null);