// SignerCircleIcon.tsx
import React from 'react';
const SignerCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ color }) => {
    const jsonString = color
        ? color.substring(2).replace(/(\w+):/g, '"$1":')
        : "";
    try {
        // Parse the JSON string into an object
        const colorObject = JSON.parse(jsonString);
        return (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="10"
                    cy="10"
                    r="10"
                    fill={`rgb(${colorObject.r},${colorObject.g},${colorObject.b})`}
                />
            </svg>
        );
    } catch (error) {}
};

export default SignerCircleIcon;
