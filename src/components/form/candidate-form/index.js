import React, { useEffect, useState } from "react";
import { Form, Select, Input, Radio, InputNumber, Slider, Row, Col, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import locationList from "../../../config/locationConfig";
import skillList from "../../../config/skillConfig";
import { marks, max, step } from "../../../config/salaryConfig";
import { useSelector } from "react-redux";

const { Option, OptGroup } = Select;
const Item = Form.Item;

const CandidateForm = ({ candidate = {}, setForm, setFileName, disabled = false }) => {
  const [form] = Form.useForm();
  const [candidateInfo, setCandidateInfo] = useState({ ...candidate });
  const { salary_type, salary } = candidateInfo;
  const locations = locationList;
  const skills = skillList;
  const [inputValue, setInputValue] = useState(salary);
  const [salaryType, setSalaryType] = useState(salary_type ? salary_type : "hourly");
  const { jobList } = useSelector(state => state.job);

  const onSalaryChange = (value) => {
    setInputValue(value);
  };

  const onRadioChange = (event) => {
    setSalaryType(event.target.value);
  };

  const arrayUnique = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].toLowerCase() === a[j].toLowerCase()) a.splice(j--, 1);
      }
    }
    return a;
  };

  const onFileChange = (event) => {
    // console.log('event: ', event);
    const { status, response } = event.file;
    if (event.event) {
      message.loading("The file is uploading and being parsed");
    } else if (status === "done") {
      if (response.data) {
        const { location, skill, phone, email, fileName } = response.data;
        if (location || skill || phone || email || fileName) {
          setCandidateInfo(
            (
              (candidateInfo.phone = phone),
              (candidateInfo.location = location),
              (candidateInfo.email = email),
              (candidateInfo.skill = candidateInfo.skill ? arrayUnique(candidateInfo.skill.concat(skill)) : skill)
            )
          );
          setFileName(fileName);
          message.success(response.msg);
          form.setFieldsValue(candidateInfo);
        } else {
          message.warning(
            "There is no such data can be retrieved from the resume"
          );
        }
      } else {
        message.error(response.msg);
      }
    }
  };

  const initialValues = (candidateInfo) => {
    if (candidateInfo.job_title)
      candidateInfo.job = [candidate.job_title, candidate.apply_job_id];
    if (candidateInfo.resume?.[0]?.file_name)
      candidateInfo.file_name = candidateInfo.resume[0].file_name;
    return candidateInfo;
  };

  useEffect(() => {
    // passing the form to the setForm function and send it back to its parent
    setForm(form);
  }, []);

  return (
    // dynamically initialise the input box with the corresponding candidate's information
    <Form
      form={form}
      style={{
        width: "100%",
        height: 500,
        overflow: "scroll",
        overflowX: "hidden",
      }}
      initialValues={initialValues(candidateInfo)}
    >
      <Item
        label="Upload"
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={onFileChange}
        style={{ width: "57%" }}
      >
        <Upload.Dragger
          name="resume"
          action="/candidate/parse"
          accept=".doc,.docx,.pdf"
          listType="picture"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag Resume to this area to upload
          </p>
          <p className="ant-upload-hint">
            The Candidate's information will be parsed
          </p>
        </Upload.Dragger>
      </Item>

      <Item
        label="Job Title"
        name="job"
        rules={[{ required: true, message: "Please Select the Job Title!" }]}

      // initialValue={[candidateInfo.apply_job_id, candidateInfo.job_title]}
      >
        <Select
          placeholder="Please Select The Job Title"
          disabled={disabled}
        >
          {jobList.map((job) => (
            <Option key={job._id} value={[job.title, job._id]}>
              {job.title}
            </Option>
          ))}
        </Select>
      </Item>

      <Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please Enter the Email!" }]}
      >
        <Input placeholder="Please Enter The Email" />
      </Item>

      <Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: "Please Enter the First Name!" }]}
      >
        <Input placeholder="Please Enter The First Name" />
      </Item>

      <Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: "Please Enter the Last Name!" }]}
      >
        <Input placeholder="Please Enter The Last Name" />
      </Item>

      <Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please Enter the Phone No.!" }]}
      >
        <Input placeholder="Please Enter The Contact Number" />
      </Item>

      <Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Please Select the Location!" }]}
      >
        <Select placeholder="Please Select the Location">
          {locations.map((loc) => (
            <Option key={loc.postCode} value={loc.city.toLowerCase()}>
              {loc.city}
            </Option>
          ))}
        </Select>
      </Item>

      <Item label="Willing to Relocate" name="relocate">
        <Radio.Group>
          <Radio.Button value="Y">Yes</Radio.Button>
          <Radio.Button value="N">No</Radio.Button>
          <Radio.Button value="NS">Not Sure</Radio.Button>
        </Radio.Group>
      </Item>

      <Item label="Citizenship" name="citizenship">
        <Radio.Group>
          <Radio.Button value="Y">Yes</Radio.Button>
          <Radio.Button value="N">No</Radio.Button>
        </Radio.Group>
      </Item>

      <Item label="Permanent or Contract" name="job_type">
        <Radio.Group>
          <Radio.Button value="PERM">Perm</Radio.Button>
          <Radio.Button value="CON">Contract</Radio.Button>
          <Radio.Button value="Both">Both</Radio.Button>
        </Radio.Group>
      </Item>

      <Item label="Baseline security clearance" name="baseline">
        <Radio.Group>
          <Radio.Button value="Y">Yes</Radio.Button>
          <Radio.Button value="N">No</Radio.Button>
        </Radio.Group>
      </Item>

      <Item label="Overall Experience">
        <Item name="overall_exp" noStyle>
          <InputNumber min={0} max={30} placeholder="0" />
        </Item>
        <span> years</span>
      </Item>

      <Item label="Experience in Current role">
        <Item name="related_exp" noStyle>
          <InputNumber min={0} max={30} placeholder="0" />
        </Item>
        <span> years</span>
      </Item>

      <Item label="Skill Set" name="skill">
        <Select
          style={{ width: "80%" }}
          mode="tags"
          placeholder="Please select the skills ( Can select multiple skills )"
        >
          <OptGroup label="Front End">
            {skills.frontend.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </OptGroup>

          <OptGroup label="Front End Framework">
            {skills.frontend_framework.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </OptGroup>

          <OptGroup label="Back End">
            {skills.backendEnd.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </OptGroup>

          <OptGroup label="Back End Framework">
            {skills.backendEnd_framework.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </OptGroup>
        </Select>
      </Item>

      <Item label="Relevant Experience / Projects" name="experience">
        <Input.TextArea placeholder="Please Enter The Relevant Experience / Projects" />
      </Item>

      <Item label="Availability" name="availability">
        <Input placeholder="Please Enter The Time" />
      </Item>

      <Item label="Visa Status" name="visa">
        <Input placeholder="Please Enter The Visa Status" />
      </Item>

      <Item label="Reference" name="reference">
        <Input placeholder="Please Enter Any Reference Information" />
      </Item>

      <Item label="Expected salary" name="salary_type">
        <Radio.Group>
          <Radio value={"annually"} onChange={onRadioChange}>
            Annually
          </Radio>
          <Radio value={"monthly"} onChange={onRadioChange}>
            Monthly
          </Radio>
          <Radio value={"weekly"} onChange={onRadioChange}>
            Weekly
          </Radio>
          <Radio value={"daily"} onChange={onRadioChange}>
            Daily
          </Radio>
          <Radio value={"hourly"} onChange={onRadioChange}>
            Hourly
          </Radio>
        </Radio.Group>
      </Item>

      <Row>
        <Col span={20}>
          <Item name="salary">
            <Slider
              style={{ margin: "0 16px" }}
              onChange={onSalaryChange}
              value={typeof inputValue === "number" ? inputValue : 0}
              min={0}
              max={max(salaryType)}
              step={step(salaryType)}
              marks={marks(salaryType)}
            />
          </Item>
        </Col>

        <Col span={4}>
          <Item name="salary">
            <InputNumber
              style={{ margin: "0 16px" }}
              onChange={onSalaryChange}
              value={inputValue}
              min={0}
              max={max(salaryType)}
            />
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CandidateForm;
