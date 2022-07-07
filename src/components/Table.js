import {Table, Tag, Button, Popconfirm, Modal} from 'antd';
import React, {useContext, useState} from 'react';
import {DownloadOutlined, DeleteOutlined,EyeOutlined} from '@ant-design/icons';
import axios from "axios";
import authContext from "../context/auth/authContext";
import {PUBLIC_API_URL} from "../config";
import AddVersion from "./AddVersion";

const redirect = (link) => {
    window.location.href = link
}


const VersionTable = () => {
    const [currentVersion, setCurrentVersion] = useState(null)
    const[visible,setVisible]=useState(false)
    const [data, setData] = React.useState([])
    const auth = useContext(authContext);
    const {isAuthenticated} = auth;
    const deleteVersion = (id) => {
        axios.delete(`${PUBLIC_API_URL}/api/version/${id}`)
            .then(res => {
                window.location.reload()
            }).catch(err => {
                console.log(err)
            }
        )
    }
    const showModal = (version) => {
        setCurrentVersion(version)
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
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
        }, , {
            title: 'Change Log',
            dataIndex: 'changeLog',
            key: 'changeLog',
            render: (_, data) =>
                <Button type="primary" shape="round" icon={<EyeOutlined />} size={'middle'} onClick={()=>{showModal(data)}}>See Changes</Button>

        }


    ];
    isAuthenticated && columns.push.apply(columns, [
        {
            title: 'Force Update',
            key: 'forceUpdate',
            dataIndex: 'forceUpdate',
            render: (_, {forceUpdate}) => (
                <>
                    {forceUpdate ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>}
                </>
            ),
        }, {
            title: 'Download',
            dataIndex: 'file',
            key: 'file',
            render: (text) => <Button type="primary" shape="circle" icon={<DownloadOutlined/>} size={"small"} color={'green'}  onClick={() => {
                redirect(text)
            }}/>
            ,
        }, {
            title: 'Functions',
            dataIndex: 'file',
            key: 'file',
            render: (_, data) => <Popconfirm
                title="Are you sure to delete this version?"
                onConfirm={() => {
                    deleteVersion(data._id)
                }}
                onCancel={() => {
                }}
                okText="Yes"
                cancelText="No"
            >
                <Button type="danger" shape="circle" icon={<DeleteOutlined/>} size={"small"} color={'green'} onClick={() => {

                }}/>
            </Popconfirm>
        }
    ]);
    const fetchData = async () => {
        const data = await axios.get('https://dds-versioning.herokuapp.com/api/version')
        setData(data.data.data)
    }


    React.useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={"table-responsive table-res"}>
            <Modal title={` Version: ${currentVersion?.version} `} visible={visible} onCancel={handleCancel} footer={false} >
            {/*    inject html content of currentVersion into div*/}
                <div dangerouslySetInnerHTML={{__html: currentVersion?.changeLog}}/>
            </Modal>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </div>
    )

};

export default VersionTable;