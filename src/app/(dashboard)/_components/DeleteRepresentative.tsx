import { db } from "@/lib/db";
import DltButton from "./DltButton";
const DeleteRepresentative = async () => {
    const res = await db.university.findMany({
        where: {
            hasRepresentative: true,
        }, select: {
            id: true,
            university_name: true,
        }
    })

    return <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        sl no.
                    </th>
                    <th scope="col" className="px-6 py-3">
                        University Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>

                </tr>
            </thead>
            <tbody>
                {res.map((r, index) => (
                    <tr key={r.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                        </th>
                        <td className="px-6 py-4">
                            {r.university_name}
                        </td>
                        <td className="px-6 py-4">
                            <DltButton id={r.id} />
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>

};
export default DeleteRepresentative;