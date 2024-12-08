import React, { useRef, useState } from "react";
import { DailyProvider } from "@daily-co/daily-react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import VideoBox from "@/app/Components/VideoBox";
import cn from "./utils/TailwindMergeAndClsx";
import IconSparkleLoader from "@/media/IconSparkleLoader";

interface SimliAgentProps {
  onStart: () => void;
  onClose: () => void;
}

// Get your Simli API key from https://app.simli.com/
const SIMLI_API_KEY = process.env.NEXT_PUBLIC_SIMLI_API_KEY;

const SimliAgent: React.FC<SimliAgentProps> = ({ onStart, onClose }) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);

  const [tempRoomUrl, setTempRoomUrl] = useState<string>("");
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const myCallObjRef = useRef<DailyCall | null>(null);
  const [chatbotId, setChatbotId] = useState<string | null>(null);

  /**
   * Create a new Simli room and join it using Daily
   */
  const handleJoinRoom = async () => {
    // Set loading state
    setIsLoading(true);

    // 1- Create a new simli avatar at https://app.simli.com/
    // 2- Cutomize your agent and copy the code output
    // 3- PASTE YOUR CODE OUTPUT FROM SIMLI BELOW 👇
    /**********************************/

    const response = await fetch("https://api.simli.ai/startE2ESession", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          apiKey: SIMLI_API_KEY,
          faceId: "003ad898-7ce6-47d6-9346-6dbae08fa032",
          voiceId: "42b39f37-515f-4eee-8546-73e841679c1d",
          firstMessage: "Hi, I’m Ong! I’m here to help you with your outdoor gear shopping. What are you looking for today?",
          systemPrompt: `
            You are a customer service agent at an athletic wear store. 
            You are helping a customer find the right gear for their outdoor activities.
            You should provide recommendations based on their preferences from the available products below.

            <AvailableItems>
              <Item>
                <Name>Trailblazer Running Shoes</Name>
                <Description>Lightweight and durable running shoes designed for trail running. Features breathable mesh and superior grip.</Description>
                <Reviews>
                  <Review>Great shoes for trail running! Very comfortable and provide excellent support.</Review>
                  <Review>Love these shoes! They are perfect for my daily runs in the park.</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>Summit Hiking Backpack</Name>
                <Description>Spacious and ergonomic backpack ideal for long hikes. Includes multiple compartments and a hydration pack.</Description>
                <Reviews>
                  <Review>This backpack is amazing! It fits everything I need for a day hike and is very comfortable to wear.</Review>
                  <Review>Highly recommend this backpack for any hiking enthusiast. It's durable and has plenty of space.</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>Peak Performance Jacket</Name>
                <Description>Waterproof and windproof jacket designed for extreme weather conditions. Keeps you warm and dry during outdoor activities.</Description>
                <Reviews>
                  <Review>Excellent jacket for cold and rainy days. Keeps me warm and dry no matter the weather.</Review>
                  <Review>Best jacket I've ever owned. Perfect for all my outdoor adventures.</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>FlexFit Yoga Pants</Name>
                <Description>Comfortable and stretchy yoga pants perfect for any workout. Features moisture-wicking fabric.</Description>
                <Reviews>
                  <Review>These yoga pants are so comfortable and fit perfectly!</Review>
                  <Review>Great for yoga and other workouts. Highly recommend!</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>Endurance Running Shorts</Name>
                <Description>Lightweight and breathable running shorts with a built-in liner. Ideal for long runs.</Description>
                <Reviews>
                  <Review>Perfect shorts for running. Very comfortable and breathable.</Review>
                  <Review>Love the built-in liner. Makes running so much more comfortable.</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>PowerLift Weightlifting Belt</Name>
                <Description>Durable weightlifting belt designed to provide support during heavy lifts. Adjustable and comfortable.</Description>
                <Reviews>
                  <Review>This belt provides great support during my lifts. Highly recommend!</Review>
                  <Review>Very durable and comfortable. Perfect for weightlifting.</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>HydroFlow Water Bottle</Name>
                <Description>Insulated water bottle that keeps your drinks cold for hours. Leak-proof and easy to carry.</Description>
                <Reviews>
                  <Review>Best water bottle I've ever owned. Keeps my drinks cold all day.</Review>
                  <Review>Very durable and leak-proof. Highly recommend!</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>ProFit Compression Socks</Name>
                <Description>Compression socks designed to improve circulation and reduce fatigue. Perfect for long runs and workouts.</Description>
                <Reviews>
                  <Review>These socks are amazing! They really help with my circulation during long runs.</Review>
                  <Review>Very comfortable and supportive. Highly recommend!</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>UltraFlex Resistance Bands</Name>
                <Description>Set of resistance bands perfect for strength training and stretching. Includes multiple resistance levels.</Description>
                <Reviews>
                  <Review>Great set of resistance bands. Perfect for my workouts.</Review>
                  <Review>Very durable and versatile. Highly recommend!</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>ActiveFit Sports Bra</Name>
                <Description>Supportive and comfortable sports bra designed for high-impact activities. Features moisture-wicking fabric.</Description>
                <Reviews>
                  <Review>Best sports bra I've ever owned. Provides great support and is very comfortable.</Review>
                  <Review>Perfect for high-impact workouts. Highly recommend!</Review>
                </Reviews>
              </Item>
              <Item>
                <Name>ZenBalance Yoga Mat</Name>
                <Description>Non-slip yoga mat with extra cushioning for comfort. Perfect for yoga and other floor exercises.</Description>
                <Reviews>
                  <Review>This yoga mat is so comfortable and provides great support.</Review>
                  <Review>Love the non-slip surface. Makes my workouts so much better.</Review>
                </Reviews>
              </Item>
            </AvailableItems>
          `,
      }),
      })

    const data = await response.json();
    const roomUrl = data.roomUrl;

    /**********************************/
    
    // Print the API response 
    console.log("API Response", data);

    // Create a new Daily call object
    let newCallObject = DailyIframe.getCallInstance();
    if (newCallObject === undefined) {
      newCallObject = DailyIframe.createCallObject({
        videoSource: false,
      });
    }

    // Setting my default username
    newCallObject.setUserName("User");

    // Join the Daily room
    await newCallObject.join({ url: roomUrl });
    myCallObjRef.current = newCallObject;
    console.log("Joined the room with callObject", newCallObject);
    setCallObject(newCallObject);

    // Start checking if Simli's Chatbot Avatar is available
    loadChatbot();
  };  

  /**
   * Checking if Simli's Chatbot avatar is available then render it
   */
  const loadChatbot = async () => {
    if (myCallObjRef.current) {
      let chatbotFound: boolean = false;

      const participants = myCallObjRef.current.participants();
      for (const [key, participant] of Object.entries(participants)) {
        if (participant.user_name === "Chatbot") {
          setChatbotId(participant.session_id);
          chatbotFound = true;
          setIsLoading(false);
          setIsAvatarVisible(true);
          onStart();
          break; // Stop iteration if you found the Chatbot
        }
      }
      if (!chatbotFound) {
        setTimeout(loadChatbot, 500);
      }
    } else {
      setTimeout(loadChatbot, 500);
    }
  };  

  /**
   * Leave the room
   */
  const handleLeaveRoom = async () => {
    if (callObject) {
      await callObject.leave();
      setCallObject(null);
      onClose();
      setIsAvatarVisible(false);
      setIsLoading(false);
    } else {
      console.log("CallObject is null");
    }
  };

  /**
   * Mute participant audio
   */
  const handleMute = async () => {
    if (callObject) {
      callObject.setLocalAudio(false);
    } else {
      console.log("CallObject is null");
    }
  };

  return (
    <>
      {isAvatarVisible && (
        <div className="h-[350px] w-[350px]">
          <div className="h-[350px] w-[350px]">
            <DailyProvider callObject={callObject}>
              {chatbotId && <VideoBox key={chatbotId} id={chatbotId} />}
            </DailyProvider>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
        {!isAvatarVisible ? (
          <button
            onClick={handleJoinRoom}
            disabled={isLoading}
            className={cn(
              "w-full h-[52px] mt-4 disabled:bg-[#343434] disabled:text-white disabled:hover:rounded-[100px] bg-simliblue text-white py-3 px-6 rounded-[100px] transition-all duration-300 hover:text-black hover:bg-white hover:rounded-sm",
              "flex justify-center items-center"
            )}
          >
            {isLoading ? (
              <IconSparkleLoader className="h-[20px] animate-loader" />
            ) : (
              <span className="font-abc-repro-mono font-bold w-[250px]">
                Looking for something different?
              </span>
            )}
          </button>
        ) : (
          <>
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={handleLeaveRoom}
                className={cn(
                  "mt-4 group text-white flex-grow bg-red hover:rounded-sm hover:bg-white h-[52px] px-6 rounded-[100px] transition-all duration-300"
                )}
              >
                <span className="font-abc-repro-mono group-hover:text-black font-bold w-[164px] transition-all duration-300">
                  Stop Interaction
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SimliAgent;
