import { editUniversity } from "@/prisma/seed";
import { z } from "zod";
import {
  email,
  facebook,
  location,
  phoneNumber1,
  phoneNumber2,
  whatsapp,
} from "./seed";

interface Props {
  type:
    | "facebook"
    | "whatsapp"
    | "youtube"
    | "email"
    | "telegram"
    | "phone1"
    | "phone2"
    | "fax"
    | "x"
    | "address"
    | "location";
  value: string;
}

export async function updateSocialAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      value: z.string().min(2),
      collageId: z.string(),
      type: z.union([
        z.literal("facebook"),
        z.literal("whatsapp"),
        z.literal("youtube"),
        z.literal("email"),
        z.literal("telegram"),
        z.literal("phone1"),
        z.literal("phone2"),
        z.literal("fax"),
        z.literal("x"),
        z.literal("address"),
        z.literal("location"),
      ]),
    });

    const data = schema.safeParse({
      value: formData.get("value"),
      type: formData.get("type"),
      collageId: formData.get("collageId"),
    });

    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }

    const { type, value, collageId } = data.data;
    let res = {
      message: "failed",
    };
    if (type === "facebook") {
      res = await facebook({ collageId: collageId, value });
    }
    if (type === "email") {
      res = await email({ collageId: collageId, value });
    }
    if (type === "whatsapp") {
      res = await whatsapp({ collageId: collageId, value });
    }
    if (type === "location") {
      res = await location({ collageId: collageId, value });
    }
    if (type === "whatsapp") {
      res = await whatsapp({ collageId: collageId, value });
    }
    if (type === "phone1") {
      res = await phoneNumber1({ collageId: collageId, value });
    }
    if (type === "phone2") {
      res = await phoneNumber2({ collageId: collageId, value });
    }

    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
