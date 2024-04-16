import { Dropdown, Input, List, Modal } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { completeTask, setTask } from "../../reducer/listSlice";
import { Create, Empty, Confirmation } from "./components";
import { useState, useEffect } from "react";
import { ActionModal } from "../../utils/type";
import { filterByCategory, sortByStatus } from "../../reducer/filterSlice";
import EditTask from "./components/EditTask";
import { category, status } from "../../utils/const";

const Home = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.openModal.isOpen);
  const sortBy = useSelector((state: RootState) => state.sort.sortBy);
  const filterCategory = useSelector((state: RootState) => state.sort.category);
  const tasks = useSelector((state: RootState) => state.taskList.list);
  const [id, setId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [modalState, setModalState] = useState<ActionModal>({
    complete: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (tasks) {
      dispatch(setTask(tasks));
    }
  }, []);

  const handleSort = (item: string) => {
    dispatch(sortByStatus(item));
  };

  const handleFilter = (item: string) => {
    dispatch(filterByCategory(item));
  };

  const handleComplete = (id: number) => {
    dispatch(completeTask(id));
    setModalState({ ...modalState, complete: false });
  };

  const handleDelete = (id: number) => {
    const updateTask = tasks.filter((item) => item.id != id);
    dispatch(setTask(updateTask));
    localStorage.setItem("tasks", JSON.stringify(updateTask));
    setModalState({ ...modalState, delete: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const taskList = tasks
    .filter((task) => {
      if (filterCategory === "All" || filterCategory === "Select Category") {
        return true;
      } else {
        return task.category === filterCategory;
      }
    })
    .filter((task) => {
      if (search === "") {
        return true;
      } else {
        return task.title.toLowerCase().includes(search.toLowerCase());
      }
    })
    .sort((a, b) => {
      if (sortBy === "Ongoing") {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      } else if (sortBy === "Completed") {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      } else {
        return 0;
      }
    });

  return (
    <div className={`max-w-md font-poppins mx-auto`}>
      <div className="mt-4 px-3 gap-2 w-full flex items-center">
        <div className="w-1/2">
          <Dropdown
            value={filterCategory}
            handleSelect={handleFilter}
            status={category}
          />
        </div>
        <div className="w-1/2">
          <Dropdown value={sortBy} handleSelect={handleSort} status={status} />
        </div>
      </div>
      <div className="mt-4 px-3 gap-2 flex items-center">
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder={"Search Quest"}
          className={"border border-gray-600 py-1.5 w-full rounded-[4px] px-4"}
          type={"text"}
          name={"search"}
          id={"search"}
        />
      </div>
      {tasks.length > 0 ? (
        <div className="mx-3 space-y-4 mt-6">
          {taskList.map((item) => (
            <List
              key={item.id}
              id={item.id}
              isComplete={item.completed}
              title={item.title}
              category={item.category}
              description={item.description}
              handleDelete={(id: number) => {
                setId(id);
                setModalState({ ...modalState, delete: true });
              }}
              handleComplete={(id: number) => {
                setId(id);
                setModalState({ ...modalState, complete: true });
              }}
              handleUpdate={(id: number) => {
                setId(id);
                setModalState({ ...modalState, edit: true });
              }}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}

      <Modal open={isModalOpen} children={<Create />} />

      {id && (
        <Modal
          open={modalState.delete}
          children={
            <Confirmation
              text="Are you sure want to delete this quest?"
              onClose={() => setModalState({ ...modalState, delete: false })}
              onSubmit={() => {
                handleDelete(id);
              }}
            />
          }
        />
      )}
      {id && tasks[id] && (
        <Modal
          open={modalState.edit}
          children={
            <EditTask
              submitButtonText="Edit Quest"
              id={id}
              title={tasks?.filter((item) => item.id === id)[0].title}
              description={
                tasks?.filter((item) => item.id === id)[0].description
              }
              onClose={() => setModalState({ ...modalState, edit: false })}
            />
          }
        />
      )}
      {id && (
        <Modal
          open={modalState.complete}
          children={
            <Confirmation
              text="Complete this quest?"
              onClose={() => setModalState({ ...modalState, complete: false })}
              onSubmit={() => {
                handleComplete(id);
              }}
            />
          }
        />
      )}
    </div>
  );
};

export default Home;
