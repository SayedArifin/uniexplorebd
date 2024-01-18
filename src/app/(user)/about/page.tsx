import { FaUserFriends } from "react-icons/fa";
import { GiSpeedometer, GiThreeFriends } from "react-icons/gi";
import { BiHappyAlt } from "react-icons/bi";
import Image from "next/image";
import ContactUsForm from "@/app/(dashboard)/_components/ContactUsForm";


const page = () => {
    return (
        <div className="">
            <section className="">
                <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-8 lg:px-6">
                    <div className="col-span-2 mb-8">
                        <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                            We are Bangladesh&apos;s premier university shortlisting website
                        </h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Welcome to the leading university shortlisting platform in
                            Bangladesh! At our website, we take the guesswork out of selecting
                            the right university for your academic journey. Our user-friendly
                            interface and comprehensive information make it easier than ever
                            to explore and compare universities across Bangladesh. Whether
                            you&apos;re a student looking for the best educational
                            opportunities or a parent guiding your child&apos;s future, our
                            website is your trusted companion for making informed decisions
                            about higher education in Bangladesh. Discover your path to
                            success with our extensive university listings, expert guidance,
                            and valuable resources.
                        </p>
                    </div>
                    <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-primary-600 md:w-12 md:h-12 dark:text-primary-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <GiSpeedometer />
                            </svg>

                            <h3 className="mb-2 text-2xl font-bold dark:text-white">Fast</h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                Our Website is always up to date with zero maintainance brack
                            </p>
                        </div>
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-primary-600 md:w-12 md:h-12 dark:text-primary-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <FaUserFriends />
                            </svg>
                            <h3 className="mb-2 text-2xl font-bold dark:text-white">
                                Users Satisfaction
                            </h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                Satisfaction of user is our only priority
                            </p>
                        </div>
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-primary-600 md:w-12 md:h-12 dark:text-primary-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <GiThreeFriends />
                            </svg>
                            <h3 className="mb-2 text-2xl font-bold dark:text-white">
                                Only One But Best
                            </h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                We are the best and only university shortlisting website in in
                                Bangladesh
                            </p>
                        </div>
                        <div>
                            <svg
                                className="w-10 h-10 mb-2 text-primary-600 md:w-12 md:h-12 dark:text-primary-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <BiHappyAlt />
                            </svg>
                            <h3 className="mb-2 text-2xl font-bold dark:text-white">
                                Free of Cost
                            </h3>
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                All of our service is free of cost. Your future is in your hand
                                , Just explore and choose
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
                    <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                        <Image
                            className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
                            src={"/images/hero.jpg"}
                            height={600}
                            width={400}
                            alt="University"
                        />
                        <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                Welcome toUniversityFinder
                                <span className="text-primary-primary">BD</span>° - Your Path to
                                Higher Education
                            </h2>
                            <p className="mb-8 font-light lg:text-xl">
                                UniversityFinder<span className="text-primary-primary">BD</span>° is your
                                go-to platform for simplifying the process of selecting the
                                right university for your future academic journey in Bangladesh.
                                Say goodbye to the complexities of the application process and
                                embrace a hassle-free experience.
                            </p>

                            <ul
                                role="list"
                                className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
                            >
                                <li className="flex space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-primary-500 dark:text-primary-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                                        Personalized Shortlisting
                                    </span>
                                </li>
                                <li className="flex space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-primary-500 dark:text-primary-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                                        Comprehensive University Profiles
                                    </span>
                                </li>
                                <li className="flex space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-primary-500 dark:text-primary-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                                        Streamlined Application Process
                                    </span>
                                </li>
                                <li className="flex space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-primary-500 dark:text-primary-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                                        Review Section
                                    </span>
                                </li>
                                <li className="flex space-x-3">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-primary-500 dark:text-primary-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                                        Discover Your Future
                                    </span>
                                </li>
                            </ul>
                            <p className="font-light lg:text-xl">
                                Simplify your journey to higher education in Bangladesh with
                                UniversityFinder<span className="text-primary-primary">BD</span>°. and
                                make the dream of studying at the perfect university a reality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ContactUsForm />
        </div>
    );
};

export default page;