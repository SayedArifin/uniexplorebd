
const loading = () => {
    return <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center   z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
    </div>;
};

export default loading;