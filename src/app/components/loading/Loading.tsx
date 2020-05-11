import React from "react";
import Loader from "react-loader-spinner";
import './Loading.scss'

const Loading = () => (
    <div className="loading">
        <Loader
            type="ThreeDots"
            color="grey"
            height={75}
            width={75}
        />
    </div>
)

export default Loading;
