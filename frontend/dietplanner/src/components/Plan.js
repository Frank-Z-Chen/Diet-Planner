import axios from "axios"
import { useState, useEffect } from "react"
import { Checkbox, Button,message } from 'antd';
export default () => {
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    const [values, setValues] = useState([])
    const onChange = (checkedValues) => {
        setValues(checkedValues)
        console.log('checked = ', checkedValues);
        // console.log(data)
    };
    useEffect(() => {
        axios.get('http://localhost:8000/planner/foods/').then(res => {
            console.log(res)
            setData(res.data)
        })
    }, [])
    const del = () => {
        axios.post('http://localhost:8000/', { username: 'jak', userid: 1, values }).then(res => {
            console.log(res)
            message.success('This is a success message');
        })
    }
    return (
        <div>
            <Checkbox.Group style={{ width: '100%', overflowY: 'scroll', height: "600px" }} onChange={onChange}>
                {data.map(val => (<div key={val.foodid} style={{display: 'flex', alignItems: 'center'}}>
                    <Checkbox value={val.foodid}></Checkbox>&nbsp; &nbsp;  {val.foodname} &nbsp; {val.fat} &nbsp; {val.protein}&nbsp; {val.carb}
                </div>))}

            </Checkbox.Group>
            <Button onClick={del} style={{ marginLeft: '20px', marginTop: '20px' }}>confirm</Button>
        </div>
    )
}