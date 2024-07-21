import { CreateAdmin } from "./components/forms";
import { SelectCollage } from "./components/select-collage";

const page = async () => {
    return (
        <main className=" container ">
            <CreateAdmin >
                <SelectCollage />
            </CreateAdmin>
        </main>
    )
}

export default page;