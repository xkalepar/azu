import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { FaFacebookSquare, FaWhatsapp } from "react-icons/fa";
import { UpdateTheLink } from "./components/forms";
import { ReactNode } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";


const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <main>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 my-4">

      <EditableDialog id={id} socialType={"facebook"}>
        <div className="flex flex-col jc items-center gap-2">  <FaFacebookSquare color="#1877f2" size={48} />
          <desc>facebook</desc></div>
      </EditableDialog>

      <EditableDialog id={id} socialType={"whatsapp"}>
        <div className="flex flex-col jc items-center gap-2">  <FaWhatsapp color="#34a853" size={48} />
          <desc>whatsapp</desc></div>
      </EditableDialog>

      <EditableDialog id={id} socialType={"email"}>
        <div className="flex flex-col jc items-center gap-2">  <MdAlternateEmail color="#000" size={48} />
          <desc>email</desc></div>
      </EditableDialog>

      <EditableDialog id={id} socialType={"x"}>
        <div className="flex flex-col jc items-center gap-2">  <FaXTwitter color="#000" size={48} />
          <desc>X</desc></div>
      </EditableDialog>

      <EditableDialog id={id} socialType={"phone1"}>
        <div className="flex flex-col jc items-center gap-2">  <FaPhoneAlt color="#000" size={48} />
          <desc>phone1</desc></div>
      </EditableDialog>
      <EditableDialog id={id} socialType={"phone2"}>
        <div className="flex flex-col jc items-center gap-2">  <FaPhoneAlt color="#000" size={48} />
          <desc>phone2</desc></div>
      </EditableDialog>
      <EditableDialog id={id} socialType={"location"}>
        <div className="flex flex-col jc items-center gap-2">  <FaMapMarkerAlt color="#000" size={48} />
          <desc>map</desc></div>
      </EditableDialog>



    </div>
  </main>;
};

interface EditProps {
  socialType:
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
}

const EditableDialog = ({ id, children, socialType }: { id: string, children: ReactNode } & EditProps) => {
  return <Dialog>
    <DialogTrigger>
      {children}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        ادخل الرابط التشعبي في الأسفل
      </DialogHeader>
      <UpdateTheLink
        collageId={id}
        socialType={socialType}
      />
    </DialogContent>
  </Dialog>
}

/* 

  facebook   String?
  whatsapp   String?
  youtube    String?
  email      String?
  telegram   String?
  phone1     String?
  phone2     String?
  fax        String?
  x          String?
  address    String?
  locainote  String?

*/

export default page;
