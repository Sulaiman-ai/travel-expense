import progressStyle from './circleprogressbar.module.css';

function calculateTangent(fraction){
    const radius = 20;
    const origin = {x:20, y:20};
    const POINT_OF_CONTACT = {x:null, y:null};
    const angle = (2*Math.PI)*fraction - 0.5*Math.PI;
    POINT_OF_CONTACT.x = radius * Math.cos(angle) + origin.x;
    POINT_OF_CONTACT.y = radius * Math.sin(angle) + origin.y;
    const radius_gradient = (POINT_OF_CONTACT.y - origin.y)/(POINT_OF_CONTACT.x - origin.x);
    console.log('angle', angle);
    console.log('point', POINT_OF_CONTACT);
    const tangent_gradient = -1/radius_gradient;
    const tangent_end = {
        x: 1,
        y: tangent_gradient
    }

    // return -1/radius_gradient
    return POINT_OF_CONTACT;
}

function calculateSectorEnd(radius, fraction){
    const origin = {x:radius, y:radius};
    const POINT_OF_CONTACT = {x:null, y:null};
    const angle = (2*Math.PI)*fraction - 0.5*Math.PI;
    POINT_OF_CONTACT.x = radius * Math.cos(angle) + origin.x;
    POINT_OF_CONTACT.y = radius * Math.sin(angle) + origin.y;

    return POINT_OF_CONTACT;
}

export default function CircleProgressBar({fraction}){
    const radius = 50;
    const POINT_OF_CONTACT = calculateSectorEnd(radius, fraction);
    const large_arc_flag = fraction > 0.5 ? 1 : 0;
    console.log('fraction', fraction)

    return (
        <svg className={progressStyle.svg}>
            <path className={progressStyle.path}
            d={`M ${radius} 0 A ${radius} ${radius} 0 ${large_arc_flag} 1 ${POINT_OF_CONTACT.x} ${POINT_OF_CONTACT.y}`} 
            // C 20 20, 40 20, 50 10 
            stroke="black" strokeWidth={radius/4} strokeLinecap="round"
            fill="transparent"
            />
        </svg>
    )
}

console.log(calculateTangent(0.5))