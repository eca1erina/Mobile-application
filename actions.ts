import { isEmailLinkError } from "@clerk/clerk-expo";
import { neon } from "@neondatabase/serverless";

export async function GET() {
    try {
      const sql = neon(``);
      const response = await sql`SELECT id, movie, countries, image FROM destinations`;
  
      return response.map((item) => ({
        id: item.id,
        name: item.movie,
        description: item.countries,
        image: item.image,
      }));
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
}

export async function GET_Details() {
  try {
    const sql = neon(``);
    const response = await sql`SELECT id, movie, countries, description, image, duration, budget FROM destinations`;

    return response.map((item) => ({
      id: item.id,
      name: item.movie,
      countries: item.countries,
      description: item.description,
      image: item.image,
      duration: item.duration,
      budget: item.budget
    }));
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

export async function GET_History( id: String ) {
    try {
      const sql = neon(``);
      const response = await sql`SELECT d.id, d.movie, d.countries, d.image
    FROM destinations d
    JOIN bookings b ON b.destination_id = d.id
    WHERE b.user_id = ${id}`;
  
      return response.map((item) => ({
        id: item.id,
        name: item.movie,
        description: item.countries,
        image: item.image,
      }));
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
}

export async function POST_Booking(user_id: String, destination_id: String) {
  try {
    const sql = neon(``);
    const booked_at = new Date().toISOString(); 

    const response = await sql`
      INSERT INTO bookings (user_id, destination_id, booked_at)
      VALUES (${user_id}, ${destination_id}, ${booked_at})
      RETURNING id, user_id, destination_id, booked_at;
    `;

    return response[0]; 
  } catch (error) {
    console.error("Error booking destination:", error);
    throw new Error("Failed to book destination");
  }
}

export async function POST(movie: String, country: String, description: String, duration: Number, budget: Number) {
  try {
    const sql = neon(``);
    const booked_at = new Date().toISOString(); 

    const response = await sql`
      INSERT INTO destinations (countries, description, image, movie, budget, duration)
      VALUES (${country}, ${description}, NULL, ${movie}, ${budget}, ${duration})
      RETURNING id, countries, description, image, movie, budget, duration;
    `;

    return response[0]; 
  } catch (error) {
    console.error("Error booking destination:", error);
    throw new Error("Failed to book destination");
  }
}
