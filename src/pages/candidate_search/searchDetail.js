import React, { useEffect, useState } from "react";
import { Card, Empty, Button, Descriptions, Badge } from "antd";
import queryString from "query-string";
import { PlusOutlined, ArrowRightOutlined, ClockCircleOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { BASE_URL } from "../../utils/constants";
import Timeline from "../../components/timeline";
import TimelineModal from "../../components/modal/timeline-modal";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, getEvents } from "../../redux/actions/event";
import { emptyCandidate, getCandidate } from "../../redux/actions/candidate";

const SearchDetail = (props) => {
  const [parentId, setParentId] = useState('0');
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState();
  const { eventList } = useSelector(state => state.event)
  const dispatch = useDispatch();

  const { candidate } = useSelector(state => state.candidate);

  useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    dispatch(getCandidate(parsed.id));
    return () => dispatch(emptyCandidate());
  }, [props.location.search, props]);

  const onClick = async () => {
    window.open(`${BASE_URL}/candidate/download/${candidate._id}`);
  };

  const addNewTimeline = async () => {
    try {
      const values = await form.validateFields();
      const candidate_id = candidate._id;
      const event = { ...values, modifiedBy_id: "123", modifiedBy: "admin", candidate_id }
      dispatch(addEvent(event));

      // clear the input box
      setVisible(false);
      form.resetFields();
    }
    catch (err) {
      console.log(err);
    };
  }

  // Show Timeline
  const showTimeline = async () => {
    dispatch(getEvents(candidate._id));
    setParentId("1");
  };

  // Close the modal
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const title =
    parentId === "0" ? (
      <span>Candidate Profile</span>
    ) : (
      <span>
        <LinkButton onClick={() => setParentId("0")}>{`${candidate.first_name} ${candidate.last_name}`}</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>TimeLine</span>
      </span>
    );

  const extra_timeline = (
    <Button shape="round" icon={<ClockCircleOutlined />} type="primary" onClick={showTimeline}>
      TimeLine
    </Button>
  );
  const extra_Event = (
    <Button shape="round" icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)}>
      Event
    </Button>
  );

  return (
    <Card title={title} extra={parentId === "0" ? extra_timeline : extra_Event}>
      {parentId === "0" ? (
        candidate ? (
          <Descriptions
            title={`${candidate.first_name} ${candidate.last_name}`}
            layout="vertical"
            bordered
            column={4}
          >
            <Descriptions.Item label="Job Title">{candidate.job_title}</Descriptions.Item>
            <Descriptions.Item label="Contact No.">{candidate.phone}</Descriptions.Item>
            <Descriptions.Item label="Email" span={2}>
              {candidate.email}
            </Descriptions.Item>
            <Descriptions.Item label="Location" span={2}>
              {candidate.location}
            </Descriptions.Item>
            <Descriptions.Item label="Expected Salary" span={2}>
              ${candidate.salary} {candidate.salary_type}
            </Descriptions.Item>
            <Descriptions.Item label="Skill Set" span={4}>
              {candidate.skill?.map((skill) => (
                <Badge status="processing" color="red" text={skill} key={skill} style={{ marginRight: 20 }} />
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Availability">{candidate.availability}</Descriptions.Item>
            <Descriptions.Item label="Visa Status">{candidate.visa}</Descriptions.Item>
            <Descriptions.Item label="Baseline security clearance">{candidate.baseline}</Descriptions.Item>
            <Descriptions.Item label="Willing to Relocate">{candidate.relocate}</Descriptions.Item>
            <Descriptions.Item label="Citizenship">{candidate.citizenship}</Descriptions.Item>
            <Descriptions.Item label="Permanent or Contract">{candidate.job_type}</Descriptions.Item>
            <Descriptions.Item label="Overall Experience">{candidate.overall_exp} YEARS</Descriptions.Item>
            <Descriptions.Item label="Experience in Current role">{candidate.related_exp} YEARS</Descriptions.Item>
            <Descriptions.Item label="Relevant Experience" span={3}>
              {candidate.experience}
            </Descriptions.Item>
            <Descriptions.Item label="RESUME">
              {candidate.resume?.[0]?.file_name ? (
                <div
                  onClick={onClick}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-around",
                    color: "#e2346ec5",
                    alignItems: "center",
                  }}
                >
                  <CloudDownloadOutlined style={{ fontSize: 30 }} />
                  <span>{candidate.resume?.[0]?.file_name}</span>
                </div>
              ) : (
                <div style={{ fontSize: 5 }}>
                  <Empty imageStyle={{ height: 40 }} description="No Resume" />
                </div>
              )}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty />
        )
      ) : (
        <div>
          <Timeline timelineData={eventList} />

          <TimelineModal
            title='Add Timeline'
            visible={visible}
            onOk={addNewTimeline}
            onCancel={handleCancel}
            setForm={setForm}
          />
        </div>
      )}
    </Card>
  );
};

export default SearchDetail;
