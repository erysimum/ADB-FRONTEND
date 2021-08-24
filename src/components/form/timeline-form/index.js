import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";
import timelineStatus from "../../../config/timelineConfig";

const { Option } = Select;

const TimelineForm = ({ setForm }) => {
  const [form] = Form.useForm();
  const status = timelineStatus;

  // dynamically initialise the dropdown with selected job name
  useEffect(() => {
    setForm(form);
    // clear the input box
    form.resetFields();
  }, [form, setForm]);

  return (
    <Form form={form}>
      <Form.Item
        label="Status"
        name="tag"
        rules={[{ required: true, message: "Please Select the Status!" }]}
      >
        <Select placeholder="Please Select The Status of the Event">
          {status.map((status) => (
            <Option value={status.text} key={status.color}>
              {status.text}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Comment"
        name="comment"
        rules={[{ required: true, message: "Please Enter the Comment!" }]}
      >
        <Input.TextArea placeholder="Please Enter The New Comment" />
      </Form.Item>

      <Form.Item label="Note" name="note">
        <Input placeholder="Please Enter The Note of the Link" />
      </Form.Item>

      <Form.Item label="URL" name="url">
        <Input placeholder="Please Enter The Reference Link" />
      </Form.Item>
    </Form>
  );
};

export default TimelineForm;
