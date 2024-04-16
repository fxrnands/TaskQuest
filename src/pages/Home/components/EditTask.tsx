import { Button, Input } from "../../../components";
import { Delete } from "../../../assets";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form } from "../../../utils/type";
import { editTask } from "../../../reducer/listSlice";

interface Props {
  id: number;
  title: string;
  description: string;
  onClose: () => void;
  submitButtonText: string;
}

const EditTask = ({
  id,
  title,
  description,
  onClose,
  submitButtonText,
}: Props) => {
  const [form, setForm] = useState<Form>({
    title: title,
    description: description,
    category: description,
  });

  const handleUpdateTask = () => {
    const newTask = {
      id: id,
      title: form.title,
      description: form.description,
      category: "Ongoing",
      completed: false,
    };

    dispatch(editTask(newTask));
    onClose();
  };

  const dispatch = useDispatch();

  return (
    <div className="font-poppins">
      <div className="flex justify-between">
        <p className="text-xl">Edit Quest</p>
        <Button
          onClick={onClose}
          children={<img src={Delete} width={20} className="mr-2" alt="Plus" />}
        />
      </div>
      <p className="mt-6 mb-1">Quest Name</p>
      <Input
        placeholder="Insert your quest name here..."
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        value={form.title}
        className="w-full outline-none p-2 rounded-[4px] border border-black"
        type={"name"}
        name={"name"}
        id={"name"}
      />
      <p className="font-semibold mb-1 mt-3">Description</p>
      <Input
        placeholder="Insert description here..."
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        value={form.description}
        className="w-full outline-none p-2 border border-black rounded-[4px]"
        type={"text"}
        name={"description"}
        id={"description"}
      />
      <Button
        className={`w-full border-green-600 bg-green-600 text-white rounded-[4px] py-2 mt-6`}
        children={submitButtonText}
        onClick={handleUpdateTask}
      />
    </div>
  );
};

export default EditTask;
