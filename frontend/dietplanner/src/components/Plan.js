import axios from "axios"
import request from "./request"
import { useState, useEffect } from "react"
import { Checkbox, Button,message ,Table} from 'antd';

export default () => {
    const columns = [
        {
            title: 'recipeNamee',
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
    const [data, setData] = useState([]);
    const [updatePlanId, setupdatePlanId] = useState("");
    useEffect(() => {
        setLoading(true);
        request.get('/planner/users/10000/recipes', 
).then(res => {
            // console.log(res)
            setData(res.data)
            setSelectedRowKeys([]);
            setLoading(false);
        })
    }, [])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);


    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const confirm = () => {
         
        request.post(`/planner/users/10000/plans/`, { userName: 'user1', recipeList: selectedRowKeys }).then(res => {
            console.log(res)
            message.success('This is a success message');
        })
    }
    const updateController = () => {
         
        request.patch('/planner/users/'+window.userId+'/plans/'+updatePlanId+'/', { userName: 'user1', recipeList: selectedRowKeys }).then(res => {
            console.log(res)
            message.success('This is a success message');
        })
    }


    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={confirm} disabled={!hasSelected} loading={loading}>
                    confirm
                </Button>
                
                <Button type="primary" onClick={updateController} disabled={!hasSelected} loading={loading}>
                    UPDATE!
                </Button>

                <label>
                    PlanId(UPDATE ONLY);
                    <input
                        type = "number"
                        value = {updatePlanId}
                        onChange = { (e) => {setupdatePlanId(e.target.value)}}
                    />
        </label>

            </div>
            <Table rowSelection={rowSelection} rowKey={record => record.recipeId} columns={columns} dataSource={data} />
        </div>
    );
}