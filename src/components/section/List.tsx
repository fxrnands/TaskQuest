import { Complete, Delete, Edit } from "../../assets";
import Button from "../base/Button";
import { useState } from "react";

interface Props {
  title: string;
  description: string;
  category: string;
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
  handleUpdate: (id: number) => void;
  id: number;
  isComplete: boolean;
}

const List = ({
  title,
  description,
  category,
  handleDelete,
  handleUpdate,
  handleComplete,
  id,
  isComplete,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border border-gray-600 rounded-[4px] font-bold">
      <div className="flex px-4 py-2 items-center w-full justify-between">
        <div
          onClick={handleExpand}
          className={`${
            isComplete ? "line-through text-gray-500" : ""
          } text-lg`}
        >
          {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </div>
        <div className="flex items-center gap-3">
          {!isComplete && (
            <>
              <Button
                onClick={() => handleComplete(id)}
                children={<img alt="complete" width={25} src={Complete} />}
              />
              <Button
                onClick={() => handleUpdate(id)}
                children={<img alt="edit" width={24} src={Edit} />}
              />
            </>
          )}
          <Button
            onClick={() => handleDelete(id)}
            children={<img alt="delete" width={20} src={Delete} />}
          />
        </div>
      </div>
      <div className={`${isExpanded ? "block px-2 pb-2" : "hidden"}`}>
        {isExpanded && (
          <div className="border bg-gray-200 border-gray-600 p-2 mt-1 rounded-[4px]">
            <p className={`border rounded-[4px] px-1 py-0.5 border-black w-full ${category === "Main Quest" ? "bg-green-500 text-white" : category === "Urgent Quest" ? "bg-red-500 text-white" : ""} `}>{category}</p>
            <p className="mt-2">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
