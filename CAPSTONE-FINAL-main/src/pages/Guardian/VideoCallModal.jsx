import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../Pediatrician/API";
import ReactPlayer from "react-player";

function JoinScreen({ getMeetingAndToken, setIncomingCall }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <div className="flex items-center rounded-md bg-green-400 py-4 px-10">
        <input
          type="text"
          className="rounded-full"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <div className="ml-5">
          <button onClick={onClick} className="font-semibold">Join</button>
          {/* {" or "} */}
          {/* <button onClick={onClick} className="font-semibold">Create Meeting</button> */}
        </div>
      </div>
      <button onClick={() => setIncomingCall(false)} className="text-blue-600 text-xl my-2 font-extrabold">Back to chat</button>
    </div>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="flex justify-center items-center flex-col">
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn ? (
        <ReactPlayer
          //
          playsinline // extremely crucial prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"300px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      ): <div className="flex justify-center items-center h-[300px] w-[300px] border">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
    </div>}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div className="items-center justify-center flex space-x-2">
      <button className="bg-slate-300 p-2" onClick={() => leave()}>Leave</button>
      <button className="bg-slate-300 p-2" onClick={() => toggleMic()}>On Mic</button>
      <button className="bg-slate-300 p-2" onClick={() => toggleWebcam()}>toggle Cam</button>
    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container flex flex-col h-[100vh] justify-center items-center ">
      <h3 className="bg-green-600 rounded-md text-white p-10 text-2xl font-bold">Meeting Id: {props.meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <div className="flex flex-col">
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button className="bg-blue-500 mt-5 px-10 py-3 rounded-full" onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

function VideoCall({user, setIncomingCall}) {
  const [meetingId, setMeetingId] = useState(null);

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: user,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} setIncomingCall={setIncomingCall} />
  );
}

export default VideoCall;