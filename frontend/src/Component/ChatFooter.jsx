import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useReducer,
} from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { IoMdAttach } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";
import { chatContext } from "./Body";
import { MdOutlineStopCircle } from "react-icons/md";
import AudioPlayer from "./messages/AudioPlayer";
import { GiCancel } from "react-icons/gi";

const iconsSize = "h-6 w-6";

function reducer(state, action) {
  switch (action.type) {
    case "setTimer": {
      return {
        ...state,
        seconds: state.seconds === 59 ? 0 : state.seconds + 1,
        minute: state.seconds === 59 ? state.minute + 1 : state.minute,
      };
    }
    case "resetTimer": {
      return {
        ...state,
        isRunning: false,
        seconds: 0,
        minutes: 0,
      };
    }
    case "Handle_stop_recording": {
      return {
        ...state,
        isRecording: false,
        isReviewingAud: true,
        isRunning: false,
      };
    }
    case "Handle_start_recording": {
      return {
        ...state,
        isRecording: true,
        isReviewingAud: false,
        isRunning: true,
      };
    }
    case "toggleEmojis": {
      return {
        ...state,
        isEmoji: !state.isEmoji,
      };
    }
    case "Handle_Sending_Message": {
      return {
        ...state,
        isEmoji: false,
        isReviewingAud: false,
        isRecording: false,
        isRunning: false,
      };
    }
    case "Handle_Cancel_Recording": {
      return {
        ...state,
        isReviewingAud: false,
        isRecording: false,
        isRunning: false,
      };
    }
    default: {
      return {
        state,
      };
    }
  }
}

function ChatFooter() {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [state, dispatch] = useReducer(reducer, {
    isEmoji: false,
    isRecording: false,
    isReviewingAud: false,
    seconds: 0,
    minutes: 0,
    isRunning: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
      // You can read the file content here if needed
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("File content:", e.target.result);
      };
      reader.readAsText(file); // or use reader.readAsDataURL(file) for images, etc.
    }
  };

  useEffect(() => {
    setshowEmojis(state.isEmoji);
  }, [state.isEmoji]);
  const {
    audioURL,
    setAudioURL,
    duration,
    setshowEmojis,
    setDuration,
    currentMessage,
    handleOnSendMessage,
    setCurrentMessage,
  } = useContext(chatContext);

  useEffect(() => {
    let interval;
    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: "setTimer" });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isRunning]);

  const resetStopwatch = () => {
    dispatch({ type: "resetTimer" });
  };
  const handleAudioData = (audioBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob); // Converts Blob to Base64
    reader.onloadend = function () {
      const base64Audio = reader.result;
      setAudioURL(base64Audio); // Save Base64 to state
    };
  };

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/mpeg",
          });
          const url = URL.createObjectURL(audioBlob);
          handleAudioData(audioBlob);
          const arrayBuffer = await audioBlob.arrayBuffer(); // Change recordedBlob to audioBlob
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          setDuration(audioBuffer.duration);
          audioChunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        dispatch({ type: "Handle_start_recording" });
      } catch (error) {
        console.error("Failed to start recording:", error);
        alert("You need to allow audio recording to record an audio");
      }
    } else {
      alert("You browser does not support recording audios");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    dispatch({
      type: "Handle_stop_recording",
    });
    resetStopwatch();
  };

  return (
    <div className="h-[50px] relative">
      <div className="flex items-center px-2 justify-between rounded-br-md gap-2 bg-slate-300 h-full w-full">
        <div className="flex items-center justify-between  w-full h-full gap-2">
          <div className={`${iconsSize}`}>
            {!state.isRecording && !state.isReviewingAud && (
              <AiFillAudio
                onClick={startRecording}
                className="text-gray-700 w-full h-full"
              />
            )}
            {state.isRecording && !state.isReviewingAud && (
              <MdOutlineStopCircle
                onClick={stopRecording}
                className="text-red-600 w-full h-full"
              />
            )}
            {!state.isRecording && state.isReviewingAud && audioURL !== "" && (
              <GiCancel
                onClick={() => {
                  dispatch({
                    type: "Handle_Cancel_Recording",
                  });
                  setAudioURL("");
                  setDuration(0);
                }}
                className="h-full w-full text-red-700"
              />
            )}
          </div>
          <div className="w-full  h-full">
            {!state.isRecording && !state.isReviewingAud && (
              <textarea
                className="w-full pt-3 sm:text-sm lg:text-lg md:text-md p-2 focus:outline-none focus:ring-0 bg-transparent  flex items-center h-full resize-none"
                placeholder="type your message"
                name="message"
                id="message"
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleOnSendMessage();
                    dispatch({
                      type: "Handle_Sending_Message",
                    });
                  }
                }}
              />
            )}
            {state.isRecording && !state.isReviewingAud && (
              <div className="flex items-center h-[50px] gap-1 ">
                <div>
                  {" "}
                  {String(state.minutes).padStart(2, "0")}:
                  {String(state.seconds).padStart(2, "0")}
                </div>
                <div className="bg-blue-600 mt-2 h-4 w-4 rounded-full animate-bounce"></div>
              </div>
            )}
            {!state.isRecording && state.isReviewingAud && audioURL !== "" && (
              <AudioPlayer
                src={audioURL}
                duration={duration}
                setDuration={setDuration}
                isReviewing={true}
              />
            )}
          </div>
        </div>
        <div className=" h-full  flex gap-2 ">
          <button
            onClick={() => {
              handleOnSendMessage();
              dispatch({
                type: "Handle_Sending_Message",
              });
            }}
            className=" group "
          >
            <div className={`${iconsSize}`}>
              <LuSendHorizonal className="h-full w-full" />
            </div>
            <div className="absolute  w-[100px] bottom-full right-3  mb-2 hidden group-hover:block bg-gray-700 text-white text-xs shadow-xl border rounded-2xl py-1 px-2">
              Press Shift + Enter to go to the next line Or click Enter to send
              a message
            </div>
          </button>
          {selectedFile && <p>{selectedFile.name}</p>}
          <button>
            <label className={`${iconsSize} cursor-pointer`}>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <IoMdAttach className="h-full w-full" />
            </label>
            
          </button>
          <button>
            <div
              onClick={() => {
                dispatch({
                  type: "toggleEmojis",
                });
              }}
              className={`${iconsSize}`}
            >
              <BsEmojiSmile className="h-full w-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatFooter;
