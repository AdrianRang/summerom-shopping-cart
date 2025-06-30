import { useState, useEffect } from "react";

function Item({ data, onChange, count, setCount }: Readonly<{ data: any, onChange: any, count: number, setCount: any }>) {
    return (
        data && <div className="item">
            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                <img src={data['img']} alt="img" className="item-img"/>
                <span className="name">{data['title']}</span>
                <span className="description">{data['description']}</span>
            </div>
            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                <span className="time">≈{data['hours']} hours</span>
                <div style={{display: "flex", alignItems: "center", gap:3}}>
                    <img src="https://summer.hackclub.com/shell.avif" alt="" className="shell"/>
                    <span className="price">{data['cost']}</span>
                </div>
                <div style={{display:"flex",flexDirection:"row", gap:6}}>
                    <button onClick={()=>{setCount(count !== 0 ? count-1 : count); onChange(data['title'], data['cost'], count-1)}}>-</button>
                    <span style={{width:count.toString().length + "ch"}}>{count}</span>
                    <button onClick={()=>{setCount(count+1); onChange(data['title'], data['cost'], count+1)}}>+</button>
                </div>
            </div>
        </div>
    )
}

function TicketItem({name, price, count, destroy}: Readonly<{name: string, price: number, count: number, destroy: any}>) {
    if(count > 0) {
        return (
            <div className="ticket-item" onClick={destroy} onKeyDown={e => console.log(e)} role="button" tabIndex={0}>
                <span>{name}</span>
                <span>${price}</span>
                <span>x{count}</span>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default function App() {
    const [shop, setShop] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const [count, setCount] = useState<number[]>([])
    const [userShells, setUsShells] = useState(0);
    let total = 0;

    // Fetch shop data once when component mounts
    useEffect(() => {
        fetch("./shop.json")
            .then((res) => res.json())
            .then((json) => {
                setShop(json[1]);
                console.log(json[1]);
            });
    }, []);

    function handleChange(name: string, cost: number, count: number, i: number) {
        setSelected(selected => [
            ...(selected.filter(val => val.name !== name)),
            {name:name, price:cost, count: count, i:i}
        ])
    }

    return (
        <>
        <div id="v-container">
            <div id="user-data">
                <span>How many shells do you have?</span>
                <input type="number" value={userShells} onChange={(event) => setUsShells(parseInt(event.target.value))} style={{width: '100%', marginTop: 5}} min='0'/>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                <div style={{display: "flex", flexDirection: "column",backgroundColor: "#00000030", padding: 10, margin: 10, gap:"10px", width: "100%", borderRadius: "5px"}}>
                    {
                        shop.map((item, i) => {
                            return (
                                <Item data={item} onChange={(a:any,b:any,c:any) => handleChange(a,b,c,i)} count={count[i] || 0}
                                    setCount={(num: number) => {
                                        setCount(prev => {
                                            const newCounts = [...prev];
                                            newCounts[i] = num;
                                            return newCounts;
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
            <div id="ticket">
                    {
                        selected.map((s) => {
                            if(s.count <= 0) return (<></>)
                            total+=parseInt(s.price)*parseInt(s.count);
                            return (
                                <TicketItem name={s.name} price={s.price} count={s.count} destroy={()=>{setSelected(selected.filter(item => item !== s)); const newCounts=[...count]; newCounts[s.i] = 0; setCount(newCounts)}}/>
                            )})
                    }
                    <div style={{width: '100%', height:'2px', backgroundColor: "gray"}} />
                    <div id="total">
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                            <h1>Total: </h1> <h2>{total}</h2>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                            <h4 style={total-userShells > 0 ? {color:"red"} : {}}>{total-userShells <= 0 ? "Left Over:" : "Missing:"}</h4><h4 style={total-userShells > 0 ? {color:"red"} : {}}>{Math.abs(total-userShells)}</h4>
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}