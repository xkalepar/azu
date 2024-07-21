import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getCollages } from "../seed";
export const SelectCollage = async () => {
    const collages = await getCollages()
    return (
        <Select name="collageId">
            <SelectTrigger className="w-[180px] my-2">
                <SelectValue placeholder="اختر كلية" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>الكليات</SelectLabel>
                    {
                        collages?.map((collage, i) => (
                            <SelectItem key={i} value={collage.id}>
                                {collage.title}
                            </SelectItem>

                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}