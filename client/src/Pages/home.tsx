import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserWorkouts } from "../Services/dbService";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthService from "../Services/authService";
import { IWorkout } from "../interfaces";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(AuthService.auth);
  const [userWorkouts, setUserWorkouts] = useState<IWorkout[]>([]);


  useEffect(() => {
      if (user) {
        getUserWorkouts(user!.uid)
       .then(data => {
         if (data) {
           setUserWorkouts([...userWorkouts, ...data]);
         } })
      }

  },[user]);

  return (
    <div className="pages-Div">
      <div>
        {userWorkouts.map((workout: IWorkout) => {
          return <p key={userWorkouts.indexOf(workout)}>{`${workout.name}`}</p>;
        })}
      </div>
      <Button
        onClick={() => {
          navigate("/workout");
        }}>
        Create a new workout
      </Button>
      <Button></Button>
    </div>
  );
};

export default Home;
