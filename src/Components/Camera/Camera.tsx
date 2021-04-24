import React,{useEffect,useState} from 'react';
import Webcam from 'react-webcam';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import "./_webcam.scss";
export interface ICameraProps {
}

export function Camera(props: ICameraProps) {
    const webcamRef = React.useRef(null);
    const {width,height} = useWindowDimensions();
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );
    const [videoConstraints,setVideoConstraints] = useState({
        width:(width /100) * 25,
        height:(height / 100) * 30,
        facingMode: "user"
    });
    useEffect(() => {
        setVideoConstraints({
            width:(width /100) * 25,
            height:(height / 100) * 30,
            facingMode: "user"
        })
    },[height,width])
    return (
        <div className="webcam">
            {/* <Webcam
                audio={false}
                height={(height / 100) * 30}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={(width / 100) * 25}
                mirrored={true}
                videoConstraints={videoConstraints}
            /> */}
        </div>
    );
}
