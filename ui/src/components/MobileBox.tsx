import { Vector3 } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";



const MobileBox = (props: {position?: Vector3 | undefined, width?: number | undefined, height?: number | undefined, depth?: number | undefined}) => {

    const ref = useRef();
    const red = useMemo(() => new Color().setHex(0xff0000), []);
    const green = useMemo(() => new Color().setHex(0x00ff00), []);


    return (
        <mesh position={props.position ?? [0, 0, 0]}>
            <boxGeometry args={[props.width ?? 1, props.height ?? 1, props.depth ?? 1]} />
            <meshBasicMaterial color={green} />
        </mesh>
    );
}


export default MobileBox