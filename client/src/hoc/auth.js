import  React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function(SpecificComponent, option, adminRoute = null){


    // option 종류
    // null => 아무나 출입이 가능
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입이 불가능한 페이지

    // adminRoute => admin만 출입 가능한가? null(default setted), true or false

    function AuthenticationCheck(props){
        const dispatch = useDispatch(); //action을 주기 위해서 사용
        const navigate = useNavigate();


        useEffect(() =>{
            dispatch(auth()) //dispatch action 이름은 auth라고 한다.
            .then(response => {
                console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate("/login")
                    }
                }
                //로그인한 상태
                else{
                    if(adminRoute && !response.payload.isAdmin){
                        navigate("/")
                    }
                    else{
                        if(option === false){
                            navigate("/")
                        }
                    }
                }
            })
        },[])
        
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}