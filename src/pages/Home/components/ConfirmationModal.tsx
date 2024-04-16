import { Button } from "../../../components";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  text: string;
}

const ConfirmationModal = ({ onClose, onSubmit, text }: Props) => {
  return (
    <div className="font-poppins px-2">
      <p>{text}</p>
      <div className="flex mt-4 justify-end gap-2">
        <Button
          className="border border-black bg-red-500 text-white py-1 px-3 rounded-[4px]"
          onClick={onClose}
          children={"Cancel"}
        />
        <Button
          onClick={onSubmit}
          className="border border-black bg-green-500 text-white py-1 px-3 rounded-[4px]"
          children={"Confirm"}
        />
      </div>
    </div>
  );
};

export default ConfirmationModal;
