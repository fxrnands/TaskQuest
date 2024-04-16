import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Down } from "../../assets";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  value: string;
  status: string[];
  handleSelect: (item: string) => void;
}

const Dropdown = ({ value, handleSelect, status }: Props) => {
  return (
    <Listbox value={value} onChange={handleSelect}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default border border-gray-600 rounded-[4px] bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ">
              <span className="block truncate">{value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <img src={Down} width={15} alt="down" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full right-0 overflow-auto rounded-md border border-black bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {status.map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-indigo-400 text-white border-black border"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 mx-1 rounded-[4px] pl-3 pr-9"
                      )
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {item}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Dropdown;
