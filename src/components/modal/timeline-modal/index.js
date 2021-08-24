import Modal from "antd/lib/modal/Modal";
import TimelineForm from "../../form/timeline-form";

const TimelineModal = ({ title, visible, onOk, onCancel, setForm }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <TimelineForm
        setForm={setForm}
      />
    </Modal>
  );
}

export default TimelineModal;