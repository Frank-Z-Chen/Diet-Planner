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
    useEffect(() => {
        axios.get('http://localhost:8000/users/1/plans/', { params: { "userName": "user1" } }).then(res => {
            console.log(res)
            setData(res.data)
        })
    }, [])
    const del = () => {

    }
    return (
        <div>
            <Checkbox.Group style={{ width: '100%', overflowX: 'scroll', display: "flex" }} onChange={onChange}>
                {data.map(val => (<div key={val} style={{ width: '200px', float: "left", textAlign: 'center', flexShrink: 0 }}>
                    <div>data</div>
                    <Checkbox value={val}></Checkbox>
                </div>))}

            </Checkbox.Group>
            <Button style={{ marginLeft: '20px', marginTop: '20px' }}>delete</Button>
        </div>
    )
}