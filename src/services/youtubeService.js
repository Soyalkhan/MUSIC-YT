
// // const API_KEY = process.env.NEXT_PUBLIC_YT_API; 
// const API_KEY = "AIzaSyCpAc-cyyILqpIdGaZy-_Q6dbW2A_9gVts"; 

// // console.log("API key : "+ API_KEY)

// export const fetchMusicData = async (query) => {
//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}`
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch music data');
//     }

//     const data = await response.json();
//     return data.items; // Return the list of items
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
