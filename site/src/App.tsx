import { useState, useEffect } from "react";

function Item({ data }: Readonly<{ data: any }>) {
    const [count, setCount] = useState(0)

    return (
        <div className="item">
            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                {data && <img src={data['img']} alt="img" className="item-img"/>}
                {data && <span className="name">{data['title']}</span>}
                {data && <span className="description">{data['description']}</span>}
            </div>
            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                <span>{data && <span className="time">≈{data['hours']} hours</span>}</span>
                <div style={{display: "flex", alignItems: "center", gap:3}}>
                    <img src="https://summer.hackclub.com/shell.avif" alt="" className="shell"/>
                    {data && <span className="price">{data['cost']}</span>}
                </div>
                <div style={{display:"flex",flexDirection:"row", gap:6}}>
                    <button onClick={()=>setCount(count !== 0 ? count-1 : count)}>-</button>
                    <span style={{width:count.toString().length + "ch"}}>{count}</span>
                    <button onClick={()=>setCount(count+1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default function App() {
    const [shop, setShop] = useState<any[]>([]);

    // Fetch shop data once when component mounts
    useEffect(() => {
        fetch("./shop.json")
            .then((res) => res.json())
            .then((json) => {
                setShop(json[1]);
                console.log(json[1]);
            });
    }, []);


    return (
        <>
        <div id="v-container">
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                <div style={{display: "flex", flexDirection: "column",backgroundColor: "#00000030", padding: 10, margin: 10, gap:"10px", width: "100%", borderRadius: "5px"}}>
                    {
                        shop.map((item) => {
                            return <Item data={item}/>
                        })
                    }
                </div>
            </div>
        </div>
        </>
    );
}