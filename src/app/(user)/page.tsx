
import { BiSearchAlt, BiSolidDashboard } from "react-icons/bi";
import { SiAcclaim } from "react-icons/si";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import FeaturedUniversity from "./_components/FeaturedUniversity";
import SigninButton from "./_components/SigninButton";
import Logo from "@/components/Logo";
import { userInfo } from "@/action";
const page = async () => {
  const { role } = await userInfo();
  const featuredUniversities = await db.featuredUniversity.findMany()
  const renderDashboard = (role: any, href: string, text: string) => {
    return role && role === href.split('/')[1].toUpperCase() && (
      <div className="group relative">
        <Link className="hover:text-red-600" href={href}>
          <BiSolidDashboard size={30} />
        </Link>
        <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
          {text}
        </span>
      </div>
    );
  };
  return <>
    <div className="max-w-7xl mx-auto  lg:pt-0 ">
      <div className="grid max-w-screen-xl px-4   mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-12  ">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className="max-w-2xl mb-4  text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
            Welcome to <br />
            <Logo />
          </div>

          <p className="max-w-2xl mb-6 font-light text-secondary-white lg:mb-8 md:text-lg lg:text-xl">
            UniExplore-BD is the ultimate destination for students seeking the
            perfect university match. Our platform is designed exclusively to
            streamline the university search process, making it easier than
            ever for students to find their ideal educational institution.
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Button variant="shadow" className="w-full bg-primary text-white ">
              <Link className="flex justify-center items-center" href={"/universities"}><span className="mr-2"><BiSearchAlt /></span>Find University</Link>

            </Button>
            <Button variant="ghost" className="w-full shadow-lg text-primary border-primary hover:bg-primary">
              <Link className="flex justify-center items-center" href={"/compare"}><span className="mr-2"><SiAcclaim /></span>Compare</Link>
            </Button>
            <SigninButton />
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            as={NextImage}
            width={500}
            height={500}
            src="/images/header.png"
            alt="Hero Image"
            priority
          />
        </div>
        <div className="fixed bottom-5 right-10 z-[9999]">

          {renderDashboard(role?.role, "/editor", "Editor Dashboard")}
          {renderDashboard(role?.role, "/advertizer", "Advertiser Dashboard")}
          {renderDashboard(role?.role, "/owner", "Owner Dashboard")}
        </div>
      </div>
    </div >
    <section>
      <div className="max-w-screen-xl px-4 py-4 mx-auto lg:pb-16 lg:py-0">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6">
          {featuredUniversities.map((university, index) => (
            <FeaturedUniversity
              key={index}
              data={university}
            />
          ))}
        </div>
      </div>
    </section>

  </>;
};

export default page;