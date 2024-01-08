const ShowcaseLabel = ({ text, data }: { text: string, data: any }) => {
    return (
        <div className="flex flex-wrap justify-start items-center">
            {text}:<span className="text-2xl ml-2 ">{data}</span>
        </div>
    );
};

export default ShowcaseLabel