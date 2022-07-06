import { InboxOutlined } from '@ant-design/icons';
import {
    Button,
    Input,
    Form,
    Select,
    Switch,
    Upload,notification
} from 'antd';
import axios from 'axios';
import React from 'react';
import {PUBLIC_API_URL} from "../config";
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e?.fileList;
};

const App = () => {
    const openNotification = () => {
        notification.open({
            message: 'Successfully created new version',
            description:
                'You can now view the new version in the list of versions',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    const onFinish = async (values) => {
        const {description,updateType,version,forceUpdate}=values
        const file=values.dragger[0].response.data
        const response=await axios.post(`${PUBLIC_API_URL}/api/version`,{description,updateType,version,forceUpdate,file})
        if (response.status===201) {
            openNotification()
        //    refresh the page
            window.location.reload()
        }
        else {
            alert('Couldn\'t create version')
        }
    //update the client using antd notification

    };

    return (
        <>
            {/*width 100%*/}

            <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            layout={'vertical'}

        >


            <Form.Item
                name="updateType"
                label="Please select update type"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please select the type of update',
                    },
                ]}
            >
                <Select placeholder="Please select the type of update"  >
                    <Option value="major">Major</Option>
                    <Option value="minor">Minor</Option>
                    <Option value="patch">Patch</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Version Name"
                name="version"
                rules={[
                    {
                        required: true,
                        message: 'Please input the version name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please input the description of version!',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="Upload the update file">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="file" action="https://dds-versioning.herokuapp.com/api/upload" maxCount={1}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>

            <Form.Item name="forceUpdate" label="Force Update" valuePropName="checked" className={'forceUpdate'}>
                <Switch />
            </Form.Item>


            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>

        </>

    );
};

export default App;