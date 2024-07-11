"use client";

import Form from "@/app/components/form";
import {
  newUserAction
} from "../actions";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";

export const CreateTeacher = () => {
  const { collageId, sectionId } = useParams();

  return (
    <Form
      sucess={"تمت العملية بنجاح"}
      className="my-2 px-4 "
      action={newUserAction}
      replaceLink={`/dashboard/sections/${collageId}/${sectionId}/teachers`}
    >
      <input type={"hidden"} name="sectionId" value={sectionId} />
      <input type={"hidden"} name="collageId" value={collageId} />
      <div className=" grid sm:grid-cols-2 gap-4 my-2">

        <div className="">
          <Label htmlFor="fullName">الاسم بالكامل</Label>
          <Input
            type={"text"}
            name="fullName"
            id="fullName"
            placeholder="ادخل اسم عضو هيئة التدريس"
          />
        </div>
        <div className="">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            type={"number"}
            name="phone"
            id="phone"
            placeholder="ادخل رقم عضو هيئة التدريس"
          />
        </div>
        <div className="">
          <Label htmlFor="password">كلمة السر</Label>
          <Input
            type={"text"}
            name="password"
            id="password"
            placeholder="انشئ كلمة المرور لعضو هيئة التدريس"
          />
        </div>
      </div>



      <SubmitButton className="w-full md:w-1/4" type={"submit"}>
        حفظ
      </SubmitButton>

    </Form>
  );
};

// export const UpdateMagazineForm = ({
//   image: oldImage = "",
//   pdf: oldPdf = "",
//   body: oldBody = "",
//   enBody: oldEnBody = "",
//   enTitle = "",
//   title = "",
//   magazineId,
//   arId,
//   enId,
// }: {
//   image: string;
//   pdf?: string;
//   body?: string;
//   enBody?: string;
//   title?: string;
//   arId?: string;
//   enId?: string;
//   magazineId: string;
//   enTitle?: string;
// }) => {
//   const [image, setImage] = useState<string>(oldImage);
//   const [body, setBody] = useState<string>(oldBody);
//   const [enBody, setEnBody] = useState<string>(oldEnBody);
//   const [pdf, setPdf] = useState<string>(oldPdf);

//   return (
//     <Form
//       className="my-2 px-4"
//       action={editMagazineAction}
//       sucess="تم تحديث المجلة بنجاح"
//       replaceLink={`/dashboard/university/magazines/${magazineId}`}
//     >
//       <Input type={"hidden"} name="magazineId" value={magazineId} />
//       <div className="flex gap-2 items-start  justify-between px-4 flex-col sm:flex-row w-full">
//         {image ? (
//           <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
//             <Suspense fallback={<Skeleton className="w-full h-full" />}>
//               <>
//                 <Button
//                   type={"button"}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setImage("");
//                   }}
//                   variant={"outline"}
//                   size={"icon"}
//                   className="hover:text-red-500 absolute top-0 right-0"
//                 >
//                   <MdOutlineCancel />
//                 </Button>
//                 <Image
//                   src={image}
//                   alt="some name"
//                   width={500}
//                   height={500}
//                   className="object-cover w-full h-full"
//                 />
//               </>
//             </Suspense>
//           </div>
//         ) : (
//           <div className=" flex flex-col ">
//             <h3>تحميل صورة الغلاف</h3>
//             <UploadDropzone
//               endpoint="imageUploader"
//               onClientUploadComplete={(res) => {
//                 setImage(res[0].url ?? "");
//                 toast({ title: "uploaded successfully" });
//               }}
//               onUploadError={(error: Error) => {
//                 alert(`ERROR! ${error.message}`);
//               }}
//             />
//           </div>
//         )}
//         {pdf ? (
//           <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
//             <Suspense fallback={<Skeleton className="w-full h-full" />}>
//               <>
//                 <Button
//                   type={"button"}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setPdf("");
//                   }}
//                   variant={"outline"}
//                   size={"icon"}
//                   className="hover:text-red-500 absolute top-0 left-0"
//                 >
//                   <MdOutlineCancel />
//                 </Button>
//                 <Image
//                   src={"/pdf.png"}
//                   alt="pdf"
//                   width={500}
//                   height={500}
//                   className="object-cover w-full h-full"
//                 />
//               </>
//             </Suspense>
//           </div>
//         ) : (
//           <div className=" flex flex-col ">
//             <h3>تحميل الملف (pdf)</h3>
//             <UploadDropzone
//               endpoint="pdfUploader"
//               onClientUploadComplete={(res) => {
//                 console.log(res);
//                 setPdf(res[0].url ?? "");
//                 toast({ title: "uploaded successfully" });
//               }}
//               onUploadError={(error: Error) => {
//                 alert(`ERROR! ${error.message}`);
//               }}
//             />
//           </div>
//         )}
//       </div>
//       <LangTabs
//         ar={
//           <>
//             <Input value={body} type={"hidden"} name="body" />

//             <div className="my-2">
//               <Label htmlFor="title">عنوان المجلة</Label>
//               <Input
//                 defaultValue={title}
//                 type={"text"}
//                 className="sm:w-1/2 lg:w-1/4"
//                 name="title"
//                 id="title"
//                 placeholder="المجلة هنا"
//               />
//             </div>
//             <Editor content={body} onChange={setBody} />
//           </>
//         }
//         en={
//           <>
//             <Input value={enBody} type={"hidden"} name="enbody" />
//             <div className="my-2">
//               <Label htmlFor="entitle">magazine title</Label>
//               <Input
//                 defaultValue={enTitle}
//                 type={"text"}
//                 className="sm:w-1/2 lg:w-1/4"
//                 name="entitle"
//                 id="entitle"
//                 placeholder="enter title"
//               />
//             </div>
//             <Editor content={enBody} onChange={setEnBody} />
//           </>
//         }
//       />

//       <SubmitButton className="w-full md:w-1/4" type={"submit"}>
//         تعديل
//       </SubmitButton>
//       {/* image  */}
//       <Input value={arId} type={"hidden"} name="arId" />
//       <Input value={enId} type={"hidden"} name="enId" />
//       <Input value={image} type={"hidden"} name="image" />
//       <Input value={pdf} type={"hidden"} name="pdf" />
//       <Separator />
//     </Form>
//   );
// };

// export const DeleteMagazineForm = ({
//   id,
//   arId,
//   enId,
// }: {
//   id: string;
//   arId: string;
//   enId: string;
// }) => {
//   return (
//     <Form
//       action={deleteMagazineAction}
//       sucess={"تم حذف المجلة بنجاح"}
//       replaceLink={`/dashboard/university/magazines`}
//     >
//       <Input type={"hidden"} name="id" value={id} />
//       <Input type={"hidden"} name="arId" value={arId} />
//       <Input type={"hidden"} name="enId" value={enId} />
//       <SubmitButton className="w-full bg-red-500 hover:bg-red-400">
//         حذف
//       </SubmitButton>
//     </Form>
//   );
// };

// export default DeleteMagazineForm;


/* 
   {image ? (
        <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <>
              <Button
                type={"button"}
                onClick={(e) => {
                  e.preventDefault();
                  setImage("");
                }}
                variant={"outline"}
                size={"icon"}
                className="hover:text-red-500 absolute top-0 right-0"
              >
                <MdOutlineCancel />
              </Button>
              <Image
                src={image}
                alt="some name"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </>
          </Suspense>
        </div>
      ) : (
        <UploadDropzone
          content={{ label: "رفع صورة عضو هيئة التدريس", }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImage(res[0].url ?? "");
            toast({ title: "uploaded successfully" });
          }}

          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}

*/