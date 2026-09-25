import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-concept-blue fine-grid opacity-30">
            {/* Fine Geometric Constellation Lines */}
            <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/[0.05]" />
            <div className="absolute top-0 left-[80%] w-[1px] h-full bg-white/[0.05]" />
            <div className="absolute top-[30%] left-0 w-full h-[1px] bg-white/[0.05]" />
            <div className="absolute top-[70%] left-0 w-full h-[1px] bg-white/[0.05]" />
            
            {/* Subtle technology grid nodes */}
            <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-concept-yellow/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-[30%] left-[80%] w-1.5 h-1.5 bg-concept-yellow/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-[70%] left-[20%] w-1.5 h-1.5 bg-concept-yellow/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-[70%] left-[80%] w-1.5 h-1.5 bg-concept-yellow/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
};

export default Background;
