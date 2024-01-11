import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { Suspense } from 'react'
import Feedback from '../../_components/Feedback'

const page = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Feedback From user</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<p>Please wait , we are fetching data for you</p>}>
                        <Feedback />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}

export default page
