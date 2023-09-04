import React from "react";
import AsyncSelect from "react-select/async";

type MultiSelectProps = {
  watchStyle: string;
};

const valueContainerStyles = "gap-1 bg-base-100 ";
const indicatorsContainerStyles = "gap-1 bg-base-100 text-base-content";
const clearIndicatorStyles = "btn btn-sm btn-ghost";
const indicatorSeparatorStyles = "bg-primary";
const dropdownIndicatorStyles = "btn btn-sm btn-ghost";
const multiValueRemoveStyles = "link link-accent p-0";
const selectInputStyles = "pl-1 py-0.5 bg-base-100 !text-base-content";
const optionStyles = `px-3 py-2 hover:cursor-pointer hover:bg-base-300 !active:bg-transparent focus:bg-transparent `;
const placeholderStyles = "text-gray-500 pl-1 py-0.5";
const multiValueStyles = " rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const menuStyles = " mt-2 bg-base-100 border-2 border-base-100";
const noOptionsMessageStyles = "p-2 bg-base-100 border border-line rounded-sm";

const MultiSelect = (props: MultiSelectProps) => {
  const { watchStyle, ...rest } = props;

  const fetchOptions = async (inputValue: string) => {
    const response = await fetch(`/api/badges?input=${inputValue}&style=${watchStyle}`);
    const data = await response.json();
    return data;
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      isSearchable={true}
      isClearable={true}
      loadOptions={fetchOptions}
      {...rest}
      menuPortalTarget={document.body}
      menuPosition={"fixed"}
      classNames={{
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        multiValue: () => multiValueStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        option: () => optionStyles,
        noOptionsMessage: () => noOptionsMessageStyles,
        menuList: () => "bg-base-100 border-none",
        menuPortal: () => "#text-primary bg-transparent",
      }}
    />
  );
};

export default MultiSelect;
