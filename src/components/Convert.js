import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, message } from 'antd';
import  { useAPI } from '../hooks/api'
import formItem from '../helpers/formItem'
import {FORM_ELEMENT_TYPES} from '../constants/formFields'
import { applyMiddleware } from 'redux';
import axios from 'axios';

import { BASE_URL } from '../config'

const Convert = function () {

  const [from, setFrom] = useState([])
  const [to, setTo] = useState([])
  const [file, setFile] = useState()
  const [selectedFrom, setSelectedFrom] = useState()
  const [selectedTo, setSelectedTo] = useState()
  const [result, setResult] = useState()
  const [isDisabled, setIsDisabled] = useState(true)
  const [form] = Form.useForm();

  const { data: mapping } = useAPI('/mapping', {});

  useEffect(() => {
    if (mapping) {
      setFrom(Object.keys(mapping))
    }
  }, [mapping])
  
  useEffect(() => {
    if(selectedFrom) {
      setTo(Object.keys(mapping[selectedFrom]))
    }
  }, [selectedFrom])

  const submit = (data) => {
    data.file = data.file.file.originFileObj
    const req = new FormData()
    req.append('file', data['file'])

    axios.post(BASE_URL + '/converter', req, { params: {
      type: 'string',
      format: data['from'],
      convertTo: data['to']
    }}).then((resp) => {
      console.log(resp.data.data)
      setResult(JSON.stringify(resp.data.data))
      setIsDisabled(false)
    })
  }

  const onDownload = () => {
    var blob1 = new Blob([result], { type: "text/plain;charset=utf-8" })
    var url = window.URL || window.webkitURL;
    var link = url.createObjectURL(blob1);
    var a = document.createElement("a");
    a.download = `${selectedFrom}-${selectedTo}`;
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsDisabled(true)
    form.resetFields()
  }

  const onReset = () => {
    form.resetFields()
  }

  const downloadStyle = {
    backgroundColor: '#a0d911',
    color: 'white',
    opacity: (isDisabled ? 0 : 1),
    transition: 'opacity 0.3s',
    width: '85px',
    paddingLeft: '0px',
    paddingRight: '0px'
  }

  return (
    <>
      <br /> <br />
      <Row>
        <Col span={9} />
        <Col span={5}>
          <Form requiredMark={false} onFinish={submit} form={form}>
            <br />
          {
            formItem({
              key: 'from',
              rules: [{required: true, message: 'Please select your input format!'}],
              kwargs: {
                placeholder: 'Select',
                onChange: (val) => {
                  setSelectedFrom(val);
                },
                size: 'middle',
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              others: {
                selectOptions: from
              },
              customLabel: 'From',})
            }
            <br />
            {
              formItem({
                key: 'to',
                rules: [{required: true, message: 'Please select your input format!'}],
                kwargs: {
                  placeholder: 'Select',
                  size: 'middle',
                  onChange: (val) => {
                    setSelectedTo(val);
                  },
                },
                type: FORM_ELEMENT_TYPES.SELECT,
                others: {
                  selectOptions: to
                },
                customLabel: 'To',})
            }
            <br />
            {
              formItem(
                {
                  key: 'file',
                  rules: [{required: true, message: 'Please upload your file!'}],
                  kwargs: {
                    onChange(info) {
                      const {status} = info.file;
                      if (status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (status === 'done') {
                        setFile(info.file);
                        message.success(`${info.file.name} file uploaded successfully.`);
                      } else if (status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    },
                    size: 'middle',
                  }, 
                  type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
                  others: null,
                  customLabel: 'Document',
                }
              )
            }
            <br />
            <Row>
              <Col span={3} />
              <Button 
                type="primary"
                htmlType="submit"
                style={{width: '85px'}}
              >
                Convert
              </Button>
              <Col span={4} />
              <Button 
                type="primary"
                onClick={onReset}
                style={{width: '85px'}}
              >
                Reset
              </Button>
            </Row>
          <br />
          <br />
          <Row>
            <Col span={9} />
            <Button 
              style={downloadStyle}
              onClick={onDownload}
            >
              Download
            </Button>
          </Row>
          </Form> 
        </Col>
      </Row>
    </>
  )
}

export default Convert