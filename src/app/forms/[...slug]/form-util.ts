type formType = "short" | "big" | "long" | "click";

type isValidType =
  | { valid: false }
  | { valid: true; formType: formType; formLink: string; formHeading: string };

interface responseData {
  _id: string;
  name: string;
  heading: string;
  type: string;
  projectId: string;
  isDeleted: false;
  createdDate: string;
}

export const isValid = async (slug: string[]): Promise<isValidType> => {
  if (slug.length < 1) return { valid: false };
  try {
    //   Check slug[0] => app.form.id and also fetch form type
    console.log(slug);
    const appData = await fetch(`http://localhost:3000/api/v1/form/${slug[0]}`);
    if (!appData.ok) return { valid: false };

    console.log("here");

    const appDataJson: { data: [responseData] } = await appData.json();

    console.log(appDataJson);

    const formLink = `/api/v1/form/${appDataJson.data[0]._id}`;
    console.log("here2");
    return {
      valid: true,
      formType: appDataJson.data[0].type as formType,
      formLink: formLink,
      formHeading: appDataJson.data[0].heading,
    };
  } catch (error) {
    console.error("Error fetching a form!", error);
    return { valid: false };
  }
};
