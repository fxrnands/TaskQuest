import { Button, Dropdown, Input } from "../../../components";
import { Delete } from "../../../assets";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/modalSlice";
import { useState } from "react";
import { Form } from "../../../utils/type";
import { addTask } from "../../../reducer/listSlice";
import { category } from "../../../utils/const";

const CreateTask = () => {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    category: "",
  });

  const handleAddTask = () => {
    const newTask = {
      id: new Date().getTime(),
      title: form.title,
      description: form.description,
      category: form.category,
      completed: false,
    };

    dispatch(addTask(newTask));
    handleClose();
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSelect = (item: string) => {
    setForm({ ...form, category: item });
  };

  const disableSubmit = !form.title || !form.description;

  return (
    <div className="font-poppins">
      <div className="flex justify-between">
        <p className="text-xl">Add New Quest</p>
        <Button
          onClick={handleClose}
          children={<img src={Delete} width={20} className="mr-2" alt="Plus" />}
        />
      </div>
      <p className="mt-6 mb-1">Quest Name</p>
      <Input
        placeholder="Insert your quest name here..."
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full outline-none p-2 rounded-[4px] border border-black"
        type={"name"}
        name={"name"}
        id={"name"}
      />
      <p className="font-semibold mb-1 mt-3">Category</p>
      <Dropdown
        value={form.category ? form.category : "Select category..."}
        handleSelect={handleSelect}
        status={category}
      />
      <p className="font-semibold mb-1 mt-3">Description</p>
      <Input
        placeholder="Insert description here..."
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full outline-none p-2 border border-black rounded-[4px]"
        type={"text"}
        name={"description"}
        id={"description"}
      />
      <Button
        disabled={disableSubmit}
        className={`w-full ${
          disableSubmit
            ? "border-gray-300 bg-gray-300 text-gray-500"
            : "border-green-600 bg-green-600 text-white"
        }  rounded-[4px] py-2 mt-6`}
        children="Create Quest"
        onClick={handleAddTask}
      />
    </div>
  );
};

export default CreateTask;
