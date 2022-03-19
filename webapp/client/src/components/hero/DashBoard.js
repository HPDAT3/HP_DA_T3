import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-6.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SentimentIcon } from "feather-icons/dist/icons/bar-chart-2.svg";
import CompanyService from "Services/CompanyService";
import BalanceSheet from "./BalanceSheet";
import Metrics from "./Metrics";

import Header from "../headers/light.js";
import ShowForm from "./ShowForm.js";
import { useHistory, useLocation } from "react-router-dom";
const MainContainer = tw.div`p-8 relative`;

const HeaderContainer = tw.div`w-full flex flex-row items-center`;
const Subheading = tw.h3`text-center font-bold text-primary-500 break-words p-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`m-8 text-center w-auto`;
const FormDescription = tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const Features = tw.div`mx-auto md:mx-0 flex flex-col lg:flex-row max-w-xs lg:max-w-none`;
const Feature = tw.div`mt-10 lg:mt-8 flex items-center md:items-start flex-col md:mr-8 last:mr-0`;
const ContentWithPaddingXl = tw.div`max-w-screen-xl mx-auto py-8 px-4`;

const FeatureHeadingContainer = tw.div`flex items-center`;
const FeatureIconContainer = styled.div`
  ${tw`mx-auto inline-block border border-primary-500 text-primary-500 text-center rounded p-2 flex-shrink-0`}
  ${(props) => [
    props.iconRoundedFull && tw`rounded-full`,
    props.iconFilled && tw`border-0 bg-primary-500 text-gray-100`,
  ]}
  svg {
    ${tw`w-5 h-5`}
  }
`;
const TabSwitcher = tw.div`flex flex-row justify-center flex-wrap w-11/12 rounded-3xl md:rounded-full border-2 px-1 py-1`;

const TabSwitchButton = styled.button`
  ${tw`w-full sm:w-1/2 md:w-1/3 px-4 sm:px-8 py-3 rounded-3xl md:rounded-full focus:outline-none text-sm font-bold text-gray-700 transition duration-300`}
  ${(props) => props.active && tw`bg-primary-500 text-gray-100`}
`;

const TabsContainer = tw.div`w-auto flex justify-center flex-wrap flex-col md:flex-row items-center md:items-start relative`;

const Tab = styled.div`
  ${tw`w-full max-w-72 mt-16 md:mr-12 md:last:mr-0 text-center px-8 rounded-lg relative text-gray-900 bg-white flex flex-col shadow-raised`}

  ${(props) =>
    props.featured &&
    css`
      ${tw`border-2 border-gray-200 shadow-none`}
    `}
`;

const TabHeader = styled.div`
  ${tw`flex flex-col leading-relaxed py-8 -mx-8 bg-gray-100 rounded-t-lg h-48`}
  .name {
    ${tw`font-bold text-lg px-4`}
  }
  .price {
    ${tw`font-bold text-3xl sm:text-4xl my-1`}
  }
  .slash {
    ${tw`text-xl text-gray-500`}
  }
  .duration {
    ${tw`lowercase text-gray-500 font-medium tracking-widest`}
  }
  .mainFeature {
    ${tw`text-gray-500 text-sm font-medium tracking-wide`}
  }
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-2/3 -translate-y-1/2`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-25 transform translate-x-2/3 translate-y-1/2 fill-current text-teal-300`}
`;

export default ({
  subheading = "Insert Company Name here",
  heading = "Key Metrics",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  // tabs = null,
  primaryButtonText = "Buy Now",
  tabs = [
    {
      switcherText: "Summary",
    },
    {
      switcherText: "Balance Sheet",
    },
    {
      switcherText: "Key Metrics",
    },
    // {
    //   switcherText: "Acquisition",
    // },
    // {
    //   switcherText: "Engagement & Retention",
    // },
    // {
    //   switcherText: "Revenue & Growth",
    // },
    // {
    //   switcherText: "Unit economics",
    // },
  ],
  forms = [
    {
      switcherText: "Form 10K",
    },
    {
      switcherText: "Form 10Q",
    },
    {
      switcherText: "Form 8K",
    },
  ],
}) => {
  const metrics = [
    [
      // "Number of qualified leads",
      // "Number of new accounts per month",
      // "% Conversion rate at each stage",
      // "Length of sales cycle (days/weeks)",
      // "Customer Acquisition cost (CAC)",
    ],
    [
      "Number of qualified leads",
      "Number of new accounts per month",
      "% Conversion rate at each stage",
      "Length of sales cycle (days/weeks)",
      "Customer Acquisition cost (CAC)",
    ],
    [
      "Number of active users (DAUs, WAUs, MAUs,#)",
      "DAU / MAU ratio",
      "% Penetration",
      "Net Promoter Score (NPS)",
    ],
    [
      "MRR or ARR (E)",
      "MRR or ARR growth rate (%)",
      "Average Revenue per Account (ARPA, E)",
      "Annual Contract Value (ACV, E)",
      "Churn rate (%)",
      "Quick ratio = New MRR / Churned MRR",
      "Distribution of accounts by size (#)",
    ],
    [
      "Lifetime Value (LTV)",
      "CAC payback (# of transactions)",
      "LTV/CAC ratio",
    ],
  ];

  // if (!tabs) tabs = defaultTabs;
  const [company, setCompany] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const [formsArray, setFormsArray] = useState([]);
  const [formsNameArray, setNameFormsArray] = useState([]);

  useEffect(() => {
    const cik = history.location.pathname.slice(6);
    console.log(cik);
    CompanyService.getCompanyByCIK(cik).then((data) => {
      setCompany(data.company);
      console.log(data, company);
      console.log(data.company.forms);
      const forms_id = data.company.forms;
      const form_names = data.company.formName;

      console.log("Forms data", data.company);

      setFormsArray(forms_id);
      setNameFormsArray(form_names);
    });
  }, [location]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabContent = [<ShowForm formsArray={formsArray} formsNameArray={formsNameArray} />, <BalanceSheet />, <Metrics />]
  return (
    <MainContainer>
      <Header roundedHeaderButton={true} />
      <Container>
        <ContentWithPaddingXl>
          <HeaderContainer>
            {subheading && <Subheading>{company && company.name}</Subheading>}
            {/* <Heading>{heading}</Heading> */}
            {/* {description && <Description>{description}</Description>} */}
            <TabSwitcher>
              {tabs.map((tabDuration, index) => (
                <TabSwitchButton
                  active={activeTabIndex === index}
                  key={index}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {tabDuration.switcherText}
                </TabSwitchButton>
              ))}
            </TabSwitcher>
          </HeaderContainer>
          <TabsContainer>
            {/* {activeTabIndex === 0 ? <ShowForm /> : getMetrics(activeTabIndex)} */}
            {tabContent[activeTabIndex]}
          </TabsContainer>
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    </MainContainer>
  );
};
