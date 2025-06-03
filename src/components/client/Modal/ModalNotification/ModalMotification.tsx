import { Modal } from "antd";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

function ModalNotification(props: { noti: any }) {
  return (
    <Modal
      open={props.noti.status !== null}
      footer={null}
      title={null}
      centered
      maskClosable={false}
      closable={false}
      width="auto"
    >
      {props.noti.status ? (
        <div className="center-flex flex-col gap-4">
          <div>
            <FaCircleCheck className="w-20 h-20 text-green-500 " />
          </div>
          <div className="text-xl font-medium text-green-700 text-center">{props.noti.message}</div>
        </div>
      ) : (
        <div className="center-flex flex-col gap-4">
          <div>
            <FaCircleExclamation className="w-20 h-20 text-red-500 " />
          </div>
          <div className="text-xl font-medium text-red-700 text-center">{props.noti.message}</div>
        </div>
      )}
    </Modal>
  );
}

export default ModalNotification;
