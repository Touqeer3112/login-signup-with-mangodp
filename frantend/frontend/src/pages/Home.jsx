// const Home = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
  
//     return (
//       <div className="home">
//         <h1>Welcome {user?.name || "Guest"}!</h1>
//         <p>This is your Home Page.</p>
//       </div>
//     );
//   };
  
//   export default Home;
// import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";  // Importing useNavigate
// import { useEffect} from "react"

const Home = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();  // Initialize navigate

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");  // Redirect to login if no user in localStorage
  //   }
  // }, [user, navigate]);

  return (
    <div className="home">
      <h1>Welcome!</h1>
      <p>This is your Home Page.</p>
        <button onClick={() => navigate("/signin")}>Start Sign Up</button>
    </div>
  );
};

export default Home;
