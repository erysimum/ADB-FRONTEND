import Modal from "antd/lib/modal/Modal";
import JobForm from "../../form/job-form";

const JobModal = ({ title, visible, onOk, onCancel, setForm, jobName }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <JobForm
        jobName={jobName}
        setForm={setForm}
      />
    </Modal>
  );
}

export default JobModal;