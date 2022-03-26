function Die(props) {
    return (
        <div onClick={props.holdDice} style={{backgroundColor: props.isHeld ? "#59E391" : "" }} className="die--face"> 
           <h2 className="die--num">{props.value}</h2>
         </div>
    )
}

export default Die