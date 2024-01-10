import EditArticle from '@/app/(user)/_components/EditArticle'
import SubmitButton from '@/components/SubmitButton'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React, { Suspense } from 'react'

const id = ({ params }: {
    params: {
        id: string
    }
}) => {

    return (
        <Card className='p-5'>
            <CardHeader>
                <CardTitle>Update Article</CardTitle>
            </CardHeader>
            <form action="">
                <Suspense fallback={<p>Please Wait...</p>}>
                    <EditArticle id={params.id} />

                </Suspense>
            </form>
        </Card>
    )
}

export default id
