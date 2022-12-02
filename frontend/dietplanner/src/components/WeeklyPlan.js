import axios from "axios"
import { useState, useEffect } from "react"
import { Checkbox, Button,Table} from 'antd';
import request from "./request";
export default () => {
    const columns = [
        {
            title: 'recipeName',
            dataIndex: 'recipeName',
        },
        {
            title: 'total_fat',
            dataIndex: 'total_fat',
        },
        {
            title: 'total_protein',
            dataIndex: 'total_protein',
        },
        {
            title: 'total_carb',
            dataIndex: 'total_carb',
        },
    ];
    
    const [data, setData] = useState([])
    const [values, setValues] = useState([])
    const onChange = (checkedValues) => {
        setValues(checkedValues)
        console.log('checked = ', checkedValues);
        // console.log(data)
    };
    const [planId, setPlanId] = useState([])
    const getdata=()=>{
        
    }
    useEffect(() => {
        request.get('/planner/users/'+ window.userId+ '/plans').then(res => {
            console.log(res)
            setPlanId(res.data)
            let arr = res.data.map(val => {
                return request.get(`planner/users/`+ window.userId+ `/plans/${val.planId}`)
            })
            Promise.all(arr).then(res => {  let arr = res.map(val => (val.data.map(val => { return request.get('planner/users/'+ window.userId+`/recipes/${val.recipeId}`) })))
            // arr=arr.map(val=>)
            let arrData = []
            for (let i in arr) {
                Promise.all(arr[i]).then(res => {
                    // arrData[i] = res.map(v => v.data[0])
                    arrData.push(res.map(v => v.data[0]))
                        if (i == arr.length - 1) {
                            console.log(arrData)
                            setData(arrData)
                        }
                }).catch(err=>{
                    arrData[i] = []
                })
            }

           
               
            })
        })
    }, [])
    const del = () => {
        request.delete(`planner/users/`+ window.userId+ `/plans/${values[0]}`).then(res => {
            console.log(res)
            //message.success('This is a success message');
        })
    }
    return (
        <div>
            
            <Checkbox.Group style={{ width: '100%', overflowX: 'scroll', display: "flex" }} onChange={onChange}>
            {data.map((val, i) => (<div key={i} style={{ marginRight:'15px',border:'1p solid #000'}}>
                    <div>
                        <Checkbox ckbox value={planId[i].planId}></Checkbox>
                        <label for="scales">PlanId:{planId[i].planId}</label>

                    </div>
                    

                    
                    {/* {val.map((val, i) => (<div key={val.recipeId}>
                        <div>{val.recipeName}</div>
                        <div>{val.total_fat}</div>
                        <div>{val.total_protein}</div>
                        <div>{val.total_carb}</div>
                    </div>))} */}
                    <Table columns={columns} dataSource={val} />
                </div>))}

            </Checkbox.Group>
            <Button onClick={del} style={{ marginLeft: '20px', marginTop: '20px' }}>delete</Button>
        </div>
    )
}