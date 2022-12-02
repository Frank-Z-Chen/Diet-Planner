import axios from "axios"
import { useState, useEffect } from "react"
import { Checkbox, Button } from 'antd';
export default () => {
    const [data, setData] = useState([1,2,3,4,5,6])
    const [values, setValues] = useState([])
    const onChange = (checkedValues) => {
        setValues(checkedValues)
        console.log('checked = ', checkedValues);
        // console.log(data)
    };
    const [planId, setPlanId] = useState([]) 

    useEffect(() => {
        axios.get('http://localhost:8000/planner/users/10000/plans').then(res => {
            console.log(res)
            setPlanId(res.data)
            let arr = res.data.map(val => {
                return axios.get(`planner/users/1/plans/${val.planId}`)
            })
            Promise.all(arr).then(res => {
                setData(res.map(val => val.data))
            })
        })
    }, [])
    const del = () => {

    }
    return (
        <div>
            <Checkbox.Group style={{ width: '100%', overflowX: 'scroll', display: "flex" }} onChange={onChange}>
            {data.map((val, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox value={planId[i].planId}></Checkbox>
                    {val.map(val => (<div>{val.planId}</div>))}
                </div>))}

            </Checkbox.Group>
            <Button style={{ marginLeft: '20px', marginTop: '20px' }}>delete</Button>
        </div>
    )
}