import { notFound } from "next/navigation";
import React, { FormEvent } from "react";
import { isValid } from "./form-util";
import { BigForm, ClickForm, LongForm, ShortForm } from "./(all-forms)";

type Props = {
  params: {
    slug: string[];
  };
};

const page = async ({ params }: Props) => {
  const slug = params.slug;
  const checkValid = await isValid(slug);
  if (!checkValid.valid) return notFound();

  const { formType, formLink, formHeading } = checkValid;

  console.log(formLink);

  if (formType == "big")
    return <BigForm formLink={formLink} formHeading={formHeading} />;
  if (formType == "short")
    return <ShortForm formLink={formLink} formHeading={formHeading} />;
  if (formType == "long")
    return <LongForm formLink={formLink} formHeading={formHeading} />;
  // if (formType == "click")
  //   return <ClickForm formLink={formLink} formHeading={formHeading} />;
  else return notFound();
};

export default page;
