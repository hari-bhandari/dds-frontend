import { InboxOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import {
    Button,
    Input,
    Form,
    Select,
    Switch,
    Upload,notification
} from 'antd';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {PUBLIC_API_URL} from "../config";
import {ChangeLog} from "./htmltemplate";

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

const App = () =>{
    useEffect(() => {
        const handler = (e) => {
            if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
                e.stopImmediatePropagation();
            }
        };
        document.addEventListener("focusin", handler);
        return () => document.removeEventListener("focusin", handler);
    }, []);

    const [changeLog, setChangelog] = useState(ChangeLog)

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
        const response=await axios.post(`${PUBLIC_API_URL}/api/version`,{description,updateType,version,forceUpdate,file,changeLog })
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
    const editorRef = useRef('');
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
                    label="Short Description"
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
            <Form.Item
                label="Change Log"
                name="changeLog"
            >
                <Editor
                    apiKey='atg8vm8gu6jvj28oyysi3c7ykf4sax4j7ef260tu4bwzdkou'
                    onInit={(evt, editor) => editorRef.current = editor}
                    cloudChannel='6'

                    onEditorChange={(content, editor) => {
                        setChangelog(content)}
                    }

                    initialValue={ChangeLog}
                    value={changeLog}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor heading | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
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