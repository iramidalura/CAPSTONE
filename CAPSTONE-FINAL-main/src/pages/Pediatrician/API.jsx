//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1YWFlYTEzYS02ZmJmLTRhM2QtOGZlZC1lZjNmY2ZhOTgyYTAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIiwiYWxsb3dfY3JlYXRlX3Jvb20iXSwiaWF0IjoxNzM3MDU4OTQ1LCJleHAiOjE3MzcxNDUzNDV9.XFgtG45eW5fp6sU-j8RWWds4-1oXm-SvEHQrQS3eNXo";
// API call to create a meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};