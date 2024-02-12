import Question from "@/app/(representative)/_component/Question";
import { Suspense } from "react";

interface pageProps {
}

const page: React.FC<pageProps> = () => {
    return <Suspense fallback="please wait.."><Question /></Suspense>;
};

export default page;