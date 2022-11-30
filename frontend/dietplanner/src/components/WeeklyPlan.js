import axios from "axios"
import { useState, useEffect } from "react"
import { Checkbox, Button } from 'antd';
export default () => {
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    const [values, setValues] = useState([])
    const onChange = (checkedValues) => {
        setValues(checkedValues)
        console.log('checked = ', checkedValues);
        // console.log(data)
    };
    useEffect(() => {

    }, [])
    const del = () => {

    }
    return (
        <div>
            <Checkbox.Group style={{ width: '100%', overflowX: 'scroll', display: "flex" }} onChange={onChange}>
                {data.map(val => (<div key={val} style={{ width: '200px', float: "left", textAlign: 'center', flexShrink: 0 }}>
                    <div>大概数据</div>
                    <Checkbox value={val}></Checkbox>
                </div>))}

            </Checkbox.Group>
            <Button style={{ marginLeft: '20px', marginTop: '20px' }}>delete</Button>
        </div>
    )
}