import axios from "axios"
import { useState, useEffect } from "react"
import { Checkbox, Button,message ,Table} from 'antd';
export default () => {
    const columns = [
        {
            title: 'foodname',
            dataIndex: 'foodname',
        },
        {
            title: 'fat',
            dataIndex: 'fat',
        },
        {
            title: 'protein',
            dataIndex: 'protein',
        },
        {
            title: 'carb',
            dataIndex: 'carb',
        },
    ];
    const [data, setData] = useState([])
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8000/planner/foods').then(res => {
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
         
        axios.post('http://localhost:8000/users/1/plans/', { userName: 'user1', recipeList: selectedRowKeys }).then(res => {
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
            </div>
            <Table rowSelection={rowSelection} rowKey={record => record.foodid} columns={columns} dataSource={data} />
        </div>
    );
}