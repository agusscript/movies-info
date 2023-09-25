const API: string = "https://api.themoviedb.org/3";

export async function get(path: string) {
  const response = await fetch(API + path, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODE5NWEwYWEyYzZiZDU4OWQwODRhN2YwOTY3MzRhMyIsInN1YiI6IjY1MTE5MGM3ZTFmYWVkMDEwMGU5ZTI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H6ASZawZBGTHK6nOfu1t6SODER41ukTuMDXeMOJlZsI",
    },
  });

  const result = await response.json();
  return result;
}
