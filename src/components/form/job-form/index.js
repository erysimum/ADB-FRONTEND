import React, { useEffect } from "react";
import { Form, Input } from "antd";

const JobForm = ({ jobName, setForm }) => {
  const [form] = Form.useForm();

  // passing the form to the setForm function and send it back to its parent
  useEffect(() => {
    setForm(form);
  }, []);

  return (
    // dynamically initialise the input box with selected job name
    <Form form={form} initialValues={{ title: jobName }}>
      <Form.Item name="title" rules={[{ required: true, message: "Please Enter the Job Title!" }]}>
        <Input placeholder="Please Enter The New Job Title" />
      </Form.Item>
    </Form>
  );
};

export default JobForm;
