import {Table, Tag, Button} from 'antd';
import React from 'react';
import {DownloadOutlined} from '@ant-design/icons';
import axios from "axios";

const redirect = (link) => {
    window.location.href = link
}
const columns = [
    {
        title: 'Version Name',
        dataIndex: 'version',
        key: 'version',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Release Date',
        dataIndex: 'releaseDate',
        key: 'releaseDate',
    },
    {
        title: 'Update Type',
        key: 'updateType',
        dataIndex: 'updateType',
        render: (_, {updateType}) => (
            <>
                {updateType === 'major' ? <Tag color="red">Major</Tag> : null}
                {updateType === 'minor' ? <Tag color="orange">Minor</Tag> : null}
                {updateType === 'patch' ? <Tag color="green">Patch</Tag> : null}
            </>
        ),
    },
    {
        title: 'Force Update',
        key: 'forceUpdate',
        dataIndex: 'forceUpdate',
        render: (_, {forceUpdate}) => (
            <>
                {forceUpdate ? <Tag color="red">Yes</Tag> :<Tag color="green">No</Tag>}
            </>
        ),
    },
    {
        title: 'Download',
        dataIndex: 'file',
        key: 'file',
        render: (text) => <Button type="primary" shape="circle" icon={<DownloadOutlined/>} size={"small"} color={'green'} onClick={() => {
            redirect(text)
        }}/>
        ,
    },
];


const VersionTable = () => {
    const [data, setData] = React.useState([])
    const fetchData = async () => {
        const data = await axios.get('https://dds-versioning.herokuapp.com/api/version')
        console.log(data.data)
        setData(data.data.data)
    }
    React.useEffect(() => {
        fetchData()
    }, [])
    return (
        <div  className={"table-responsive table-res"}>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </div>
    )

};

export default VersionTable;