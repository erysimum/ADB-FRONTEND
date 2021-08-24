import { ArrowRightOutlined, MailOutlined, PlusOutlined, SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Select, Table, Tag, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reqFetchResume } from "../../api";
import LinkButton from "../../components/link-button";
import CandidateModal from "../../components/modal/candidate-modal";
import TimelineModal from "../../components/modal/timeline-modal";
import Timeline from "../../components/timeline";
import locationList from "../../config/locationConfig";
import { addCandidate, editCandidate, emptyAdvancedSearch, getCandidates, resetMessage, searchCandidate, updateIsRead } from "../../redux/actions/candidate";
import { addEvent, getEvents } from "../../redux/actions/event";
import { PAGE_SIZE } from "../../utils/constants";

const CandidateList = () => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [parentId, setParentId] = useState('0');
  const [parentName, setParentName] = useState('');
  const [showStatus, setShowStatus] = useState(0);
  const [searchType, setSearchType] = useState('job_title');
  const [searchInput, setSearchInput] = useState('');
  const [currentRow, setCurrentRow] = useState({});
  const [fileName, setFileName] = useState();
  const [form, setForm] = useState();
  const [isSearching, setIsSearching] = useState(false);

  const { eventList } = useSelector(state => state.event)
  const { candidateList, searchedCandidate, candidateMessage, success, isSearchedCandidateDone, isCandidateListDone } = useSelector((state) => state.candidate);
  const dispatch = useDispatch();
  const isFirstRun = useRef(true);

  useEffect(() => {
    let loadingState = false;
    if (candidateList.length === 0 && !isCandidateListDone) {
      loadingState = true;
    }
    setLoading(loadingState);
  }, [candidateList]);

  useEffect(() => {
    let searchLoadingState = false;
    if (searchedCandidate.length === 0 && !isSearchedCandidateDone) {
      searchLoadingState = true;
    }
    setSearchLoading(searchLoadingState);
  }, [searchedCandidate]);

  useEffect(() => {
    return () => dispatch(emptyAdvancedSearch());
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (success != null) {
      success ? message.success(candidateMessage) : message.error(candidateMessage);
    }
    dispatch(resetMessage());
  }, [candidateMessage, success]);

  const candidateColumn = () => {
    const columns = [
      {
        title: "Job Title",
        dataIndex: "job_title",
        sorter: (a, b) => onSort(a.job_title, b.job_title),
        sortDirections: ["ascend", "descend"],
        width: 100,
      },
      {
        title: "First Name",
        dataIndex: "first_name",
        sorter: (a, b) => onSort(a.first_name, b.first_name),
        sortDirections: ["ascend", "descend"],
        width: 100,
      },
      {
        title: "Last Name",
        dataIndex: "last_name",
        sorter: (a, b) => onSort(a.last_name, b.last_name),
        sortDirections: ["ascend", "descend"],
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: (a, b) => onSort(a.email, b.email),
        sortDirections: ["ascend", "descend"],
        width: 200,
        render: (email) =>
          <Typography
            ellipsis='true'
            style={{ width: 200 }}
          >
            <a
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </Typography>
      },
      {
        title: "Contact No.",
        dataIndex: "phone",
        sorter: (a, b) => onSort(a.phone, b.phone),
        sortDirections: ["ascend", "descend"],
        width: 100,
        render: (contact) =>
          <Typography
            ellipsis='true'
            style={{ width: 100 }}
          >
            {contact}
          </Typography>
      },
      {
        title: "Location",
        dataIndex: "location",
        sorter: (a, b) => onSort(a.location, b.location),
        sortDirections: ["ascend", "descend"],
        width: 30,
        render: (location) => (
          <>
            {locationList.map((loc) => {
              let color;
              if (loc.city.toUpperCase() === location.toUpperCase()) {
                color = loc.color;
                return (
                  <span style={{ fontWeight: "bold" }} key={loc.color}>
                    <Tag color={color}>{location.toUpperCase()}</Tag>
                  </span>
                );
              }
              return "";
            })}
          </>
        ),
      },
      {
        title: "View",
        render: (candidate) => {
          const { _id } = candidate;
          return (
            <span>
              <Link
                to={{ pathname: `/search/detail/?id=${_id}` }}
                target="_blank"
                onClick={() => dispatch(updateIsRead(_id))}
              >
                <LinkButton>Info</LinkButton>
              </Link>
              <LinkButton onClick={() => showUpdate(candidate)}>Edit</LinkButton>
              <LinkButton onClick={() => showTimeline(candidate)}>Timeline</LinkButton>
            </span>
          );
        },
        width: 100,
      },
    ];

    return columns;
  };

  const onSort = (a, b) => {
    if (a == null) a = "0";
    if (b == null) b = "0";
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  const onSearchClick = () => {
    dispatch(emptyAdvancedSearch());
    const isEmpty = Object.values(searchInput).every(x => x === undefined);
    if (isEmpty) {
      message.error('Please put in some words!');
      return;
    }

    setLoading(true);
    dispatch(searchCandidate(searchType, searchInput));

    setIsSearching(true);
    setLoading(false);
  }

  // Show the candidate list
  const showCandidateList = () => {
    setParentId("0");
    setParentName("");
  };

  // Show Add Modal
  const showAddCandidate = () => {
    setShowStatus(1);
  };

  // Show Update Modal
  const showUpdate = (currentRow) => {
    setCurrentRow(currentRow);
    setShowStatus(2);
  };

  // Show Timeline
  const showTimeline = async (currentRow) => {
    setCurrentRow(currentRow);
    dispatch(getEvents(currentRow._id));
    setParentId(1);
    setParentName(` ${currentRow.first_name} ${currentRow.last_name}`)
  };

  const showAddEvent = () => {
    setShowStatus(3);
  }

  // Close the modal
  const handleCancel = () => {
    form.resetFields();
    setShowStatus(0);
  };

  const clearFields = async () => {
    const isEmpty = Object.values(searchInput).every(x => x === undefined);
    if (isEmpty) {
      return;
    }
    setShowStatus(0);
    setSearchType('job_title');
    setSearchInput('');
    dispatch(getCandidates());
    dispatch(emptyAdvancedSearch());
    setIsSearching(false);
  }

  const fetchResume = async () => {
    setLoading(true);
    const result = await reqFetchResume();
    setLoading(false);

    if (result.success) {
      message.success(result.msg);
      dispatch(getCandidates());
    } else {
      message.error(result.msg);
    }

  }

  const onOk = async () => {
    try {
      if (showStatus === 3) {
        const values = await form.validateFields();
        const candidate_id = currentRow._id;
        const event = { ...values, modifiedBy_id: "123", modifiedBy: "admin", candidate_id }
        dispatch(addEvent(event));
      }
      else {
        const values = await form.validateFields();
        const job_title = values.job[0];
        const apply_job_id = values.job[1];

        if (showStatus === 1) {
          const { upload, job, ...candidate } = { ...values, job_title, apply_job_id };
          dispatch(addCandidate(candidate, fileName));
        }
        else {
          const { upload, ...candidate } = { ...values, _id: currentRow._id, gmtUpdate: new Date(), job_title, apply_job_id };
          dispatch(editCandidate(candidate, fileName));

        }
      }
      setShowStatus(0);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }

  };

  const title =
    parentId === "0" ? (
      <span>
        <Select
          value={searchType}
          style={{ width: 160 }}
          onChange={(value) => setSearchType(value)}
        >
          <Option value="job_title">By Job Title</Option>
          <Option value="first_name">By First Name</Option>
          <Option value="last_name">By Last Name</Option>
          <Option value="email">By Email</Option>
          <Option value="phone">By Contact No.</Option>
          <Option value="location">By Location</Option>
          <Option value="experience">By Experience</Option>
          <Option value="skill">By Skills</Option>
        </Select>
        <Input
          placeholder="Please type keywords"
          style={{ width: 200, margin: "0 15px", borderRadius: "20px" }}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <Button shape="round" icon={<SearchOutlined />} type="primary" onClick={onSearchClick} />
        <Button shape="round" icon={<MailOutlined />} type="primary" style={{ marginLeft: 10 }} onClick={fetchResume} />
        <Button shape="round" icon={<CloseCircleOutlined />} type="primary" style={{ marginLeft: 10 }} onClick={clearFields} />
      </span>
    ) : (
      <span>
        <LinkButton onClick={showCandidateList}>Candidates</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    );

  const extra_candidate = (
    <Button shape="round" icon={<PlusOutlined />} type="primary" onClick={showAddCandidate}>
      Candidate
    </Button>
  );

  const extra_timeline = (
    <Button shape="round" icon={<PlusOutlined />} type="primary" onClick={showAddEvent}>
      Event
    </Button>
  );

  return (
    <Card title={title} extra={parentId === "0" ? extra_candidate : extra_timeline}>
      {parentId === "0" ? (
        <div>
          <Table
            bordered
            rowKey="_id"
            columns={candidateColumn()}
            loading={isSearching ? searchLoading : loading}
            dataSource={!isSearching ? candidateList : searchedCandidate}
            pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: "bold" }}>Work Experience:</span>
                  <li>{record.experience}</li>
                </p>
              ),
            }}
            rowClassName={(record) => (record.isRead ? "read" : "unread")}
          />

          <CandidateModal
            title='Add New Candidate'
            visible={showStatus === 1}
            onOk={onOk}
            onCancel={handleCancel}
            setForm={setForm}
            setFileName={setFileName}
          />

          <CandidateModal
            title='Edit Candidate'
            visible={showStatus === 2}
            onOk={onOk}
            onCancel={handleCancel}
            candidate={currentRow}
            setForm={setForm}
            setFileName={setFileName}
          />
        </div>
      ) : (
        <div>
          <Timeline timelineData={eventList} />

          <TimelineModal
            title="Add Timeline"
            visible={showStatus === 3}
            onOk={onOk}
            onCancel={handleCancel}
            setForm={setForm}
          />
        </div>
      )}
    </Card>
  );
}

export default CandidateList;