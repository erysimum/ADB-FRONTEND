import Modal from "antd/lib/modal/Modal";
import CandidateForm from "../../form/candidate-form";

const CandidateModal = ({ title, visible, onOk, onCancel, setForm, setFileName, candidate, disabled }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      centered
      destroyOnClose
    >
      <CandidateForm
        candidate={candidate}
        setForm={setForm}
        disabled={disabled}
        setFileName={setFileName}
      />
    </Modal>
  );
}

export default CandidateModal;