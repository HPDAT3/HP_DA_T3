import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SentimentIcon } from "feather-icons/dist/icons/bar-chart-2.svg";
import FormService from "Services/FormService";
import { useLocation } from "react-router-dom";

const FormDescription = tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;
const Feature = tw.div`mt-10 lg:mt-8 flex items-center md:items-start flex-col md:mr-8 last:mr-0`;

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
const FeatureHeading = tw.div`ml-3 font-bold text-xl`;
const ParaHeading = tw.div`font-bold text-2xl`;

const TextContent = tw.div`p-8 text-center w-full md:text-left`;
const FormSwitcher = tw.div`flex flex-row justify-center flex-wrap w-auto h-40 md:w-1/4 rounded-3xl border-2 px-1 py-1 mt-8 `;
const Form = tw.div`w-auto flex flex-row justify-center flex-wrap `;
const FormSwitchButton = styled.button`
  ${tw`w-full px-4 sm:px-8 py-3 rounded-3xl focus:outline-none text-sm font-bold text-gray-700 transition duration-300`}
  ${(props) => props.active && tw`bg-primary-500 text-gray-100`}
`;

const FormsContainer = tw.div`w-3/4 flex justify-center flex-wrap flex-col md:flex-row items-center md:items-start relative`;

export default ({
  formsArray = [],
  formsNameArray = [],
}) => {
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [formsArrayData, setFormsArrayData] = useState({});
  const location = useLocation();

  const [forms_10K, setForm_10K] = useState(null);
  const [forms_10Q, setForm_10Q] = useState(null);
  const [forms_8K, setForm_8K] = useState(null);


  const features = [
    {
      Icon: SentimentIcon,
      title: "Positive",
      description:
        "We have the best professional marketing people across the globe just to work with you.",
      iconContainerCss: tw`bg-teal-300 text-teal-800`,
    },
    {
      Icon: SentimentIcon,
      title: "Negative",
      description:
        "We promise to offer you the best rate we can - at par with the industry standard.",
      iconContainerCss: tw`bg-red-300 text-red-800`,
    },
  ];

  const getPara = (para) => {
    return (
      <TextContent>
        {/* <Subheading>{subheading}</Subheading> */}
        <ParaHeading>{para.heading}</ParaHeading>
        <FormDescription>{para.content}</FormDescription>
        <Feature>
          <FeatureHeadingContainer>
            <FeatureIconContainer
              iconFilled={true}
              iconRoundedFull={true}
              css={(para.Sentiment > 60 ? features[0].iconContainerCss : features[1].iconContainerCss) || null}
            >
              {<SentimentIcon />}
            </FeatureIconContainer>
            {/* <FeatureHeading>{(para.Sentiment > 60 ? para.Sentiment + "% Postive" : 100 - para.Sentiment + "% Negative") || null}</FeatureHeading> */}
            <FeatureHeading>{para.Sentiment}</FeatureHeading>
          </FeatureHeadingContainer>
          {/* <FeatureDescription>{feature.description}</FeatureDescription> */}
        </Feature>
      </TextContent>
    );
  };

  useEffect(() => {
    setActiveFormIndex(0);
  }, [location]);

  useEffect(() => {
    console.log("Active form index changed", activeFormIndex);

    // fetch the activeFormIndex from the formsArray
    // check if key exists, or not
    // if exists, do not fetch
    // else fetch

    if (formsArray.length != 0) {
      if (!formsArrayData[activeFormIndex]) {
        console.log("fetching this document", formsArray[activeFormIndex]);

        FormService.getFormByID(formsArray[activeFormIndex]).then((form) => {
          console.log(form);

          let currentFormsData = { ...formsArrayData };
          currentFormsData[activeFormIndex] = form;
          setFormsArrayData(currentFormsData);

          // Render should occur at this

          // if (form.type === "10K") {
          //   console.log([...forms_10K, form])
          //   const tempForms = [...forms_10K, form];
          //   setForm_10K(tempForms.form);
          //   // forms_10K.push(form);
          // }
          // if (form.type === "10Q") {
          //   setForm_10Q(forms_10Q => [...forms_10Q, form]);            // forms_10Q.push(form);
          // }
          // if (form.type === "8K") {
          //   setForm_8K(forms_8K => [...forms_8K, form]);            // forms_8K.push(form);
          // }

          // console.log(forms_10K);
          // console.log(forms_10Q);
          // console.log(forms_8K);
        });
      }
    }

    // formsArray.map((id) => {
    //   console.log(id);
    //   FormService.getFormByID(id).then((form) => {
    //     console.log(form);

    //     if (form.type === "10K") {
    //       console.log([...forms_10K, form])
    //       const tempForms = [...forms_10K, form];
    //       setForm_10K(tempForms.form);
    //       // forms_10K.push(form);
    //     }
    //     if (form.type === "10Q") {
    //       setForm_10Q(forms_10Q => [...forms_10Q, form]);            // forms_10Q.push(form);
    //     }
    //     if (form.type === "8K") {
    //       setForm_8K(forms_8K => [...forms_8K, form]);            // forms_8K.push(form);
    //     }

    //     console.log(forms_10K);
    //     console.log(forms_10Q);
    //     console.log(forms_8K);
    //   });
    // });
  }, [activeFormIndex, formsArray]);


  console.log("RENDERED", formsArrayData);

  const getForms = () => {
    console.log("props", formsArray);

    return (
      <Form>
        <FormSwitcher>
          {formsNameArray.map((value, index) => (
            <FormSwitchButton
              active={activeFormIndex === index}
              key={index}
              onClick={() => setActiveFormIndex(index)}
            >
              {value}
            </FormSwitchButton>
          ))}
        </FormSwitcher>
        <FormsContainer>
          {formsArrayData[activeFormIndex] && formsArrayData[activeFormIndex].form.paras.map((value) => getPara(value))}
        </FormsContainer>
      </Form>
    );
  };

  return <>{getForms()}</>;
};
