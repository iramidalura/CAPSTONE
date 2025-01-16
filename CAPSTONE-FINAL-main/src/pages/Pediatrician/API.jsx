// This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIzY2Y0MjYxNC0xNmFjLTRhYWYtOGNhOC0zYzBkNTZmOTJlMmMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczNjM5ODU5OCwiZXhwIjoxNzM3MDAzMzk4fQ.5jJ6lafijJRDb224WuA7ZU7OgrRQoSU9elCVxQ4hApE";

// API call to create a meeting
export const createMeeting = async () => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`, // Corrected header format
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // Body can include additional options if needed
    });

    // Check for HTTP errors
    if (!res.ok) {
      throw new Error(`Failed to create meeting. Status: ${res.status}`);
    }

    // Destructure the roomId from the response
    const { roomId } = await res.json();
    return roomId;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
