import { Plus, ToDoList } from "../../assets";
import Button from "../base/Button";
import { useDispatch } from "react-redux";
import { openModal } from "../../reducer/modalSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto border shadow-nav flex max-w-md items-center justify-between p-3"
        aria-label="Global"
      >
        <div className="flex ml-2 items-center">
          <img src={ToDoList} width={30} alt="ToDoList" />
          <p className="font-bold font-poppins ml-2 text-xl">TaskQuest</p>
        </div>
        <Button
          onClick={handleOpenModal}
          children={<img src={Plus} width={25} className="mr-2" alt="Plus" />}
        />
      </nav>
    </header>
  );
}
