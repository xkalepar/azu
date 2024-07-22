import React from 'react'
import { SelectCollage } from '../components/select-collage'
import { CreateAdmin } from '../components/forms'

const page = () => {
    return (
        <section>
            <CreateAdmin >
                <SelectCollage />
            </CreateAdmin>
        </section>
    )
}

export default page