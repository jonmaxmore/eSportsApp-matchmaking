
import clsx from "clsx";
import style from "./style.module.css";

type Props = {}

const DummyCustomGame = (props: Props) => {

    return (
        <div className = {clsx(style.HomeStyle,"flex gap-[20px] h-full w-full")} > 
        
            <div style = {{
                width: "100%", alignContent: "center"
            }}>
               <h1 style={{color: "white", textAlign:"center", marginTop: "200px", fontSize: "60px"}}>Comming soon</h1> 
            </div>
            
        </div>
    );
};

export default DummyCustomGame;