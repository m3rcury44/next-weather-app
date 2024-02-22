import {Suspense} from "react";
import {Main} from "@/components/main";
import {Loading} from "@/components/loading";

const Home = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Main/>
        </Suspense>
    );
};

export default Home;