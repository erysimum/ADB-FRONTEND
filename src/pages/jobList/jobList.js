import React, { useState, useEffect, useRef } from "react";
import { Card, Table, Button, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import LinkButton from "../../components/link-button";
import { addJobCandidate, addJob, editJob, emptyJobCandidateList, getJobCandidateList, resetIsJobListDone, resetMessages } from "../../redux/actions/job";
import { editCandidate } from "../../redux/actions/candidate";
import CandidateModal from "../../components/modal/candidate-modal";
import JobModal from "../../components/modal/job-modal";

const JobList = () => {
  const [jobLoading, setJobLoading] = useState(false);
  const [jobCandidateLoading, setJobCandidateLoading] = useState(false);
  const [parentId, setParentId] = useState('0');
  const [parentName, setParentName] = useState("");
  const [showStatus, setShowStatus] = useState(0);
  const [jobCurrentRow, setJobCurrentRow] = useState({});
  const [candidateCurrentRow, setCandidateCurrentRow] = useState({});
  const [form, setForm] = useState();
  const [fileName, setFileName] = useState();
  const [jobCurrentPage, setJobCurrentPage] = useState(1);
  const [candidateCurrentPage, setCandidateCurrentPage] = useState(1);

  const { jobList, jobCandidateList, isJobListDone, isJobCandidateListDone, jobMessage, candidateMessage, success } = useSelector(state => state.job);
  const dispatch = useDispatch();
  const isJobFirstRun = useRef(true);
  const isCandidateFirstRun = useRef(true);

  useEffect(() => {
    return () => dispatch(resetIsJobListDone());
  }, []);

  useEffect(() => {
    let loadingState = false;
    if (jobList.length === 0 && !isJobListDone) {
      loadingState = true;
    }
    setJobLoading(loadingState);
  }, [jobList, isJobListDone]);

  useEffect(() => {
    let jobCandidateLoadingState = false;
    if (jobCandidateList.length === 0 && !isJobCandidateListDone) {
      jobCandidateLoadingState = true;
    }
    setJobCandidateLoading(jobCandidateLoadingState);
  }, [jobCandidateList, isJobCandidateListDone]);

  useEffect(() => {
    if (isJobFirstRun.current) {
      isJobFirstRun.current = false;
      return;
    }
    if (success != null) {
      success ? message.success(jobMessage) : message.error(jobMessage);
    }
    dispatch(resetMessages());
  }, [jobMessage]);

  useEffect(() => {
    if (isCandidateFirstRun.current) {
      isCandidateFirstRun.current = false;
      return;
    }
    if (success != null) {
      success ? message.success(candidateMessage) : message.error(candidateMessage);
    }
    dispatch(resetMessages());
  }, [candidateMessage]);

  const jobColumn = () => {
    const columns = [
      {
        title: "Job Title",
        dataIndex: "title",
        sorter: (a, b) => onSort(a.title, b.title),
        sortDirections: ["ascend", "descend"],
        width: 300,
      },
      {
        title: "Num of Candidates",
        dataIndex: "num",
        key: "num",
        width: 100,
      },
      {
        title: "View",
        render: (jobRow) => (
          <span>
            <LinkButton onClick={() => showUpdateJob(jobRow)}>Edit</LinkButton>
            <LinkButton onClick={() => showCandidateList(jobRow)}>Candidates</LinkButton>
          </span>
        ),
        width: 200,
      },
    ];

    return columns;
  };

  const candidateColumn = () => {
    const columns = [
      {
        title: "First Name",
        dataIndex: "first_name",
        width: 100,
      },
      {
        title: "Last Name",
        dataIndex: "last_name",
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "email",
        width: 100,
      },
      {
        title: "Contact No.",
        dataIndex: "phone",
        width: 100,
      },
      {
        title: "location",
        dataIndex: "location",
        width: 30,
      },
      {
        title: "View",
        render: (candidate) => (
          <span>
            <LinkButton onClick={() => showUpdateCandidate(candidate)}>Info / Edit</LinkButton>
          </span>
        ),
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

  // update the parentId to show Candidate list
  const showCandidateList = (currentRow) => {
    setJobCurrentRow(currentRow);
    setParentId(currentRow._id);
    setParentName(currentRow.title);
    dispatch(getJobCandidateList(currentRow._id));
  };

  // update the parentId to show Job list
  const showJobList = () => {
    setParentId('0');
    setParentName('');
    dispatch(emptyJobCandidateList());
    setCandidateCurrentPage(1);
  };

  // Show Add Modal
  const showAdd = () => {
    if (parentId === "0") {
      setShowStatus(1);
    } else {
      setShowStatus(3);
    }
  };

  // Show Update Modal
  const showUpdateJob = (currentRow) => {
    setJobCurrentRow(currentRow);
    setShowStatus(2);
  };

  const showUpdateCandidate = (currentRow) => {
    setCandidateCurrentRow(currentRow);
    setShowStatus(4);
  };

  // Close the modal
  const handleCancel = () => {
    form.resetFields();
    setShowStatus(0);
  };

  const onOk = async () => {
    const values = await form.validateFields();
    const job_title = jobCurrentRow.title;
    const apply_job_id = jobCurrentRow._id;

    if (parentId === '0') {
      const { title } = values;
      showStatus === 1 ? dispatch(addJob(title)) : dispatch(editJob(jobCurrentRow._id, title));
    }
    else {
      if (showStatus === 3) {
        const { upload, job, ...candidate } = { ...values, job_title, apply_job_id };
        dispatch(addJobCandidate(candidate, fileName));
      }
      else {
        const { upload, ...candidate } = { ...values, _id: candidateCurrentRow._id, gmtUpdate: new Date(), job_title, apply_job_id };
        dispatch(editCandidate(candidate, fileName));
      }
      dispatch(getJobCandidateList(jobCurrentRow._id));
    }

    setShowStatus(0);
    form.resetFields();
  }

  const title =
    parentId === "0" ? (
      "Job Category"
    ) : (
      <span>
        <LinkButton onClick={showJobList}>Job Category</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName} Candidates</span>
      </span>
    );

  // Button for importing new job
  const extra_job = (
    <Button shape="round" icon={<PlusOutlined />} type="primary" onClick={showAdd}>
      Job
    </Button>
  );

  // Button for importing new candidate
  const extra_candidate = (
    <Button shape="round" icon={<PlusOutlined />} type="primary" onClick={showAdd}>
      Candidate
    </Button>
  );

  return (
    <Card title={title} extra={parentId === '0' ? extra_job : extra_candidate}>
      <Table
        bordered
        rowKey='_id'
        loading={parentId === '0' ? jobLoading : jobCandidateLoading}
        dataSource={parentId === '0' ? jobList : jobCandidateList}
        columns={parentId === '0' ? jobColumn() : candidateColumn()}
        pagination={{
          defaultPageSize: 6,
          showQuickJumper: true,
          hideOnSinglePage: true,
          current: parentId === '0' ? jobCurrentPage : candidateCurrentPage
        }}
        onChange={(page) => {
          parentId === '0' ? setJobCurrentPage(page.current) : setCandidateCurrentPage(page.current);
        }}
      />

      <JobModal
        title='Add New Job'
        visible={showStatus === 1}
        onOk={onOk}
        onCancel={handleCancel}
        setForm={setForm}
      />

      <JobModal
        title="Edit Job Title"
        visible={showStatus === 2}
        onOk={onOk}
        onCancel={handleCancel}
        jobName={jobCurrentRow.title}
        setForm={setForm}
      />

      <CandidateModal
        title='Add New Candidate'
        visible={showStatus === 3}
        onOk={onOk}
        onCancel={handleCancel}
        jobList={jobList}
        // candidate={candidateCurrentRow}
        setForm={setForm}
        setFileName={setFileName}
        candidate={{ job_title: jobCurrentRow.title, apply_job_id: jobCurrentRow._id }}
        disabled={true}
      />

      <CandidateModal
        title='Edit Candidate'
        visible={showStatus === 4}
        onOk={onOk}
        onCancel={handleCancel}
        jobList={jobList}
        candidate={candidateCurrentRow}
        setForm={setForm}
        setFileName={setFileName}
      />
    </Card>
  );
}

export default JobList;
