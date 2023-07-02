import React ,{useEffect,useState}from 'react';

const Statewise = () => {
   
    const [states,setstates]=useState([]);
    useEffect(() => {
        const getStatedata = async () =>{
            const res=await fetch("https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise");
            const data= await res.json();
            console.log(data.data.statewise[0]);
            setstates(data.data.statewise);
        }
        getStatedata();

    },[])
 
    
    return (
        <div className="statemenu">
          
          {states.map((state) =>(
            <tr>
                <td className="state_state">{state.state}</td>
                <td className="state_state">{state.confirmed}</td>
                <td className="state_state">{state.recovered}</td>
                <td className="state_state">{state.deaths}</td>
            </tr>

           ))}
           
           
          
           

        </div>
    )
}

export default Statewise
