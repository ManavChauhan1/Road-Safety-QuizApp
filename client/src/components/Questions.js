import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";
//Custom Hook
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { useDispatch } from "react-redux";
import { UpdateResult } from "../hooks/setResult";

export default function Questions({onChecked}){

    const [checked, setChecked] = useState(undefined)
    const {trace} = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)

    const [{isLoading, apiData, serverError}] = useFetchQuestion()

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    // useSelector(state => console.log(state));

    useEffect(()=>{
        dispatch(UpdateResult({ trace, checked}))
    }, [checked])

    function onSelect(i){
    //    console.log(i);
       onChecked(i);
       setChecked(i);
       dispatch(UpdateResult({ trace, checked}))
    }

    if(isLoading) return <h3 className="text-light">isLoading</h3>
    if(serverError) return <h3 className="text-light">{serverError.message || "Unknown Error"}</h3>

    return(
        <div className="questions">
            <h2 className="text-light">{questions?.question}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i)=>(
                    <li key={i}>
                        <input 
                            type = "radio"
                            value= {true}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />

                        <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace]?.toString() == i?.toString() ? 'checked' : ''}`}></div>
                    </li>
                    ))
                }
            </ul>
        </div>
    )
}