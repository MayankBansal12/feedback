import isSecretValid from "@/helpers/validSecret";
import dbConnect from "@/lib/dbConnect";
import FormModel from "@/models/Form";
import { formSchema } from "@/schemas/formSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  let response: ApiResponse;
  // response = await isSecretValid(request)

  // if (!response.success) {
  //     return new Response(JSON.stringify(response), { status: response.status })
  // }

  try {
    const form = await FormModel.find({ _id: params.id });
    response = {
      success: true,
      status: 200,
      message: "fetched form data!",
      data: form,
    };
    return new Response(JSON.stringify(response), { status: response.status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      response = {
        success: false,
        status: 400,
        message: error.errors[0].message,
      };
    } else {
      console.error("Error fetching a form!", error);
      response = {
        success: false,
        status: 400,
        message: "Error fetching a form!",
      };
    }
    return new Response(JSON.stringify(response), { status: response.status });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  let response: ApiResponse;
  response = await isSecretValid(request);

  if (!response.success) {
    return new Response(JSON.stringify(response), { status: response.status });
  }

  try {
    const reqData = await request.json();
    const { name, heading } = formSchema.parse(reqData);
    const form = await FormModel.findByIdAndUpdate(
      { _id: params.id },
      { name, heading }
    );
    response = {
      success: true,
      status: 200,
      message: "updated form data!",
      data: form ?? {},
    };
    return new Response(JSON.stringify(response), { status: response.status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      response = {
        success: false,
        status: 400,
        message: error.errors[0].message,
      };
    } else {
      console.error("Error updating a form!", error);
      response = {
        success: false,
        status: 400,
        message: "Error updating a form!",
      };
    }
    return new Response(JSON.stringify(response), { status: response.status });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  let response: ApiResponse;
  response = await isSecretValid(request);

  if (!response.success) {
    return new Response(JSON.stringify(response), { status: response.status });
  }

  try {
    await FormModel.findByIdAndDelete(params.id);
    response = {
      success: true,
      status: 200,
      message: "successfully deleted form!",
    };
    return new Response(JSON.stringify(response), { status: response.status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      response = {
        success: false,
        status: 400,
        message: error.errors[0].message,
      };
    } else {
      console.error("Error deleting form!", error);
      response = {
        success: false,
        status: 400,
        message: "Error deleting the form!",
      };
    }
    return new Response(JSON.stringify(response), { status: response.status });
  }
}
