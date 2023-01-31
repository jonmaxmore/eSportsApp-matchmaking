import React from 'react';
import { useNavigate } from "react-router-dom";

type Props = {};

const Page404 = (props: Props) => {
  let navigate = useNavigate();

  return <>
  <div>Page404</div>
  <button style={{width: '50%',
    height: '60px',
    border: '5px solid #3AADEA',
    backgroundColor: '#1a5a80',
    marginTop: '1rem',
  color: 'white'}} onClick={() => navigate("/home")}>Go to Home</button>
  <button style={{width: '50%',
    height: '60px',
    border: '5px solid #3AADEA',
    backgroundColor: '#1a5a80',
    marginTop: '1rem',
    marginRight: '1rem',
  color: 'white'}} onClick={() => navigate("/logout")}>Logout</button></>
  ;
};

export default Page404;
