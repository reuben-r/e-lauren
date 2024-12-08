"use client";
import React, { useEffect, useState } from "react";
import SimliAgent from "@/app/SimliAgent";
import DottedFace from "./Components/DottedFace";
import Homepage from "./homepage";

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-gray min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      <div className="flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">

        <Homepage />
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            height: '500px',
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {!showDottedFace && <><div
              style={{
                position: "relative",
                width: '300px',
                height: '300px',
                marginRight: '10px',
                backgroundColor: 'white',
              }}
            >
              <img src="https://hips.hearstapps.com/hmg-prod/images/index-workout-1672249187.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*" />
            </div><div
              style={{
                position: "relative",
                width: '300px',
                height: '300px',
                marginRight: '10px',
                backgroundColor: 'white',
              }}
            >
                <img src="https://bolsosymoda.co/3333-large_default/athletic-apparel.jpg" />
              </div><div
                style={{
                  position: "relative",
                  width: '300px',
                  height: '300px',
                  marginRight: '10px',
                  backgroundColor: 'white',
                }}
              >
                <img src="https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/20/1-best-tennis-shoes-15275040-main.jpg" />
              </div></>}
            <div
              style={{
                position: "relative",
                width: '500px',
              }}
            >
              {showDottedFace && <DottedFace />}
              <SimliAgent
                onStart={onStart}
                onClose={onClose}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Demo;
