import React, { useEffect } from "react";
import { Form, Input, Radio, InputNumber, Row, Col, Divider } from "antd";

const Item = Form.Item;

const SearchForm = ({ setForm }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    // passing the form to the setForm function and send it back to its parent
    setForm(form);
  });

  return (
    // dynamically initialise the input box with the corresponding candidate's information
    <div>
      <Form form={form}>
        <Divider orientation="left" plain style={{ color: "#e2346ec5", fontWeight: "bold", fontStyle: "oblique" }}>
          FULL TEXT SEARCH
        </Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Item label="Text Search" name="text">
              <Input.TextArea
                placeholder="Please Enter Any Keywords&#13;&#10;E.g. location melbourne / university melbourne"
              />
            </Item>
          </Col>
        </Row>
      </Form>

      <Form form={form}>
        <Divider orientation="right" plain style={{ color: "#e2346ec5", fontWeight: "bold", fontStyle: "oblique" }}>
          FILTER SEARCH
        </Divider>

        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <Item label="Citizenship" name="citizenship">
              <Radio.Group>
                <Radio.Button value="Y">Yes</Radio.Button>
                <Radio.Button value="N">No</Radio.Button>
              </Radio.Group>
            </Item>
          </Col>

          <Col className="gutter-row" span={8}>
            <Item label="Baseline security clearance" name="baseline">
              <Radio.Group>
                <Radio.Button value="Y">Yes</Radio.Button>
                <Radio.Button value="N">No</Radio.Button>
              </Radio.Group>
            </Item>
          </Col>

          <Col className="gutter-row" span={8} style={{ overflow: "hidden" }}>
            <Item label="Willing to Relocate" name="relocate">
              <Radio.Group>
                <Radio.Button value="Y">Yes</Radio.Button>
                <Radio.Button value="N">No</Radio.Button>
                <Radio.Button value="NS">Not Sure</Radio.Button>
              </Radio.Group>
            </Item>
          </Col>

          <Col className="gutter-row" span={8}>
            <Item label="Permanent or Contract" name="job_type">
              <Radio.Group>
                <Radio.Button value="PERM">Perm</Radio.Button>
                <Radio.Button value="CON">Contract</Radio.Button>
                <Radio.Button value="Both">Both</Radio.Button>
              </Radio.Group>
            </Item>
          </Col>

          <Col className="gutter-row" span={8}>
            <Item label="Overall Experience">
              <Item name="overall_exp" noStyle>
                <InputNumber min={0} max={30} placeholder="0" />
              </Item>
              <span> years</span>
            </Item>
          </Col>

          <Col className="gutter-row" span={8}>
            <Item label="Experience in Current role">
              <Item name="related_exp" noStyle>
                <InputNumber min={0} max={30} placeholder="0" />
              </Item>
              <span> years</span>
            </Item>
          </Col>

          <Col className="gutter-row">
            <Item label="Expected salary" name="salary_type">
              <Radio.Group>
                <Radio value={"annually"}>Annually</Radio>
                <Radio value={"monthly"}>Monthly</Radio>
                <Radio value={"weekly"}>Weekly</Radio>
                <Radio value={"daily"}>Daily</Radio>
                <Radio value={"hourly"}>Hourly</Radio>
              </Radio.Group>
            </Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Item name="salary">
              <Input placeholder="Please Enter The Expected Salary" />
            </Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;
