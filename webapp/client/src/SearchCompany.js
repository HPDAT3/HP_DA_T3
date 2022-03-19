import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import companies from "./components/hero/company";

//eslint-disable-next-line
import { css } from "styled-components/macro";

import Select from "react-select";

import { useHistory } from "react-router-dom";

const Actions = styled.div`
  ${tw`w-full relative text-center p-4 font-semibold`}
 
  Select {
    ${tw`sm:pr-24 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
 
`;

export default () => {
  const [query, setQuery] = useState(null);
  const history = useHistory();

  const onChange = (opt) => {
    console.log(opt.Company, opt.cik);

    history.push(`/comp/${opt.cik}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query, "Render new component now");
  };

  return (
    <Actions>
        {/* <input type="search" placeholder="Search Company" cik={query} onChange={onChange} /> */}
        {/* <button onClick={onSubmit}><FeatherIcon icon="search" /></button> */}
        <Select
        options={companies}
        onChange={onChange}
        placeholder="Please Select a Company"
        noOptionsMessage={() => "No such Company available"}
        theme={(theme) => ({
            ...theme,
            borderRadius: 15,
            height: 100,
            colors: {
            ...theme.colors,
            primary: '#6415FF',
            },
        })}
        />
    </Actions>
  );
};
