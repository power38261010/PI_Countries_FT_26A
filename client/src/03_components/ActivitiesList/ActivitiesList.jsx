// import React,{useEffect} from "react";
import {useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react"
import {deleteActivity, getActivities} from "../../02_actions";
import Activity from "../Activity/Activity";
import NavBar from "../NavBar/NavBar";
import "./ActivityList.css";

    import { useHistory } from "react-router-dom"; 

       // 

export default function ActivitiesList() {
 
 const history = useHistory()
 const dispatch = useDispatch();
 let activities = useSelector((state) => state.activities);
 const [actividad, setActividad] = useState(activities);
 
 useEffect(() => { dispatch(getActivities()); setActividad(activities)  }, [dispatch ,activities]);
//  useEffect(() => { setActividad(activities)  }, [activities]);
 
 function handleDelete(id) 
 {
   dispatch(deleteActivity(id));
  //  history.push('/activities');

 } 


  
  return (
    <div className="activityListContainer">

      <div>
        <NavBar />
      </div>

      <div className="activityCardListContainer">{
      actividad?.map((acc) => {
          return (
            <div className="activityCardList">
            <input className='btnDelete' type='button' value='X' onClick={() => handleDelete(acc.id) }/>
              <Activity
                id = {acc.id}
                name={acc.name}
                duration={acc.duration}
                season={acc.season}
                difficulty={acc.difficulty}
              />
            </div> 
          )
        })}
      </div>
      
    </div>
  );
}
