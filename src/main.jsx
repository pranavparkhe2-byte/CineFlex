



import React, { useEffect, useMemo, useState } from "react";



import { createRoot } from "react-dom/client";



import {



  Search, Sparkles, Home, Compass, Bookmark, Clock3, UserRound,



  SlidersHorizontal, Bell, ChevronRight, ChevronDown, Play, Plus,



  Check, Star, X, Film, WandSparkles, Heart, ArrowUpRight, Menu,



  RotateCcw, Flame, Clapperboard, Eye, EyeOff



} from "lucide-react";



import "./styles.css";







const API_URL = "http://127.0.0.1:8000";







const movies = [



  { id: 1, title: "Interstellar", year: 2014, rating: 8.7, genre: ["Sci-Fi", "Drama"], runtime: "2h 49m", image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg", description: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.", reason: "You enjoy ambitious sci-fi stories with emotional stakes." },



  { id: 2, title: "Inception", year: 2010, rating: 8.8, genre: ["Sci-Fi", "Thriller"], runtime: "2h 28m", image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg", description: "A skilled thief enters the dreams of others, where the line between an idea and reality begins to blur.", reason: "A strong match for your love of mind-bending plots." },



  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genre: ["Action", "Crime"], runtime: "2h 32m", image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/hqkIcbrOHL86UncnHIsHVcVmzue.jpg", description: "Batman faces a criminal mastermind who pushes Gotham into chaos and tests the limits of its heroes.", reason: "You rate character-driven thrillers highly." },



  { id: 4, title: "Dune: Part Two", year: 2024, rating: 8.5, genre: ["Sci-Fi", "Adventure"], runtime: "2h 46m", image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg", description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.", reason: "Epic world-building based on your sci-fi and adventure preferences." },



  { id: 5, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: ["Drama"], runtime: "2h 22m", image: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg", description: "Two imprisoned men build a friendship over decades, finding hope and dignity in unexpected places.", reason: "Highly rated dramas tend to be a favorite in your profile." },



  { id: 6, title: "La La Land", year: 2016, rating: 8.0, genre: ["Romance", "Drama"], runtime: "2h 08m", image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/nX5XotM9yprCKarRH4fzOq1VM1J.jpg", description: "A musician and an aspiring actor fall in love while pursuing their dreams in Los Angeles.", reason: "A change of pace with style, music and heartfelt storytelling." },



  { id: 7, title: "Everything Everywhere All at Once", year: 2022, rating: 7.8, genre: ["Sci-Fi", "Comedy"], runtime: "2h 19m", image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg", description: "An exhausted laundromat owner is swept into a multiverse-spanning adventure only she can save.", reason: "Inventive storytelling for fans of surprising concepts." },



  { id: 8, title: "Spider-Man: Into the Spider-Verse", year: 2018, rating: 8.4, genre: ["Animation", "Action"], runtime: "1h 57m", image: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg", description: "Miles Morales becomes Spider-Man and meets heroes from across parallel dimensions.", reason: "Distinctive visuals and inventive action fit your taste." },



  { id: 9, title: "The Grand Budapest Hotel", year: 2014, rating: 8.1, genre: ["Comedy", "Adventure"], runtime: "1h 39m", image: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/3w3y8o3gdW3ce1p9l7Q3x0V9Z7g.jpg", description: "A legendary concierge and his protégé become entangled in a story of theft, inheritance and friendship.", reason: "A visually rich, offbeat pick for your next movie night." },



  { id: 10, title: "The Social Network", year: 2010, rating: 7.8, genre: ["Drama"], runtime: "2h 00m", image: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/2t6p1jz2x8k0a5s9x2.jpg", description: "A look at the ambition, relationships and lawsuits surrounding the creation of a global social network.", reason: "Smart, fast-paced drama for fans of ambitious characters." },



  { id: 11, title: "Arrival", year: 2016, rating: 7.9, genre: ["Sci-Fi", "Drama"], runtime: "1h 56m", image: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/yIZ1xendyqKvY3FGeeUYUd5X9Mm.jpg", description: "A linguist works to communicate with mysterious visitors whose arrival changes humanity's understanding of time.", reason: "Thoughtful sci-fi with a memorable emotional payoff." },



  { id: 12, title: "Whiplash", year: 2014, rating: 8.5, genre: ["Drama", "Music"], runtime: "1h 47m", image: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", backdrop: "https://image.tmdb.org/t/p/w1280/6bbZ6XyvgUrzupBm8e5W4w5r5g.jpg", description: "A young drummer pushes himself to the limit under the demanding guidance of a ruthless instructor.", reason: "Intense character conflict and high-stakes storytelling." }



];







const freeMovies = [

  {

    id: "free-sintel", title: "Sintel", year: 2010, rating: 8.0,

    genre: ["Animation", "Fantasy"], runtime: "15 min",

    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",

    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",

    description: "A young woman sets out on a dangerous quest to find her lost dragon friend.",

    reason: "An openly licensed Blender Foundation short film.", isFreeMovie: true,

    videoKey: "eRsGyueVLvQ", attribution: "Sintel — Blender Foundation, Creative Commons Attribution 3.0"

  },

  {

    id: "free-big-buck-bunny", title: "Big Buck Bunny", year: 2008, rating: 7.0,

    genre: ["Animation", "Comedy"], runtime: "10 min",

    image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?auto=format&fit=crop&w=600&q=80",

    backdrop: "https://images.unsplash.com/photo-1535241749838-299277b6305f?auto=format&fit=crop&w=1200&q=80",

    description: "A gentle giant rabbit decides to stand up to three mischievous forest rodents.",

    reason: "An openly licensed Blender Foundation short film.", isFreeMovie: true,

    videoKey: "aqz-KE-bpKQ", attribution: "Big Buck Bunny — Blender Foundation, Creative Commons Attribution 3.0"

  }

];



const genres = ["All", "Sci-Fi", "Thriller", "Drama", "Action", "Comedy", "Adventure", "Romance", "Animation"];







const navItems = [



  { label: "Home", icon: Home },



  { label: "Discover", icon: Compass },



  { label: "My List", icon: Bookmark },



  { label: "Recently Watched", icon: Clock3 },
  { label: "Free Movies", icon: Film }



];







// Converts backend movie objects into the shape used by the movie cards.



// Existing catalogue entries keep their real posters; unknown API results use a neutral cinema image.



const FALLBACK_POSTER = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80";







function normalizeApiMovie(movie, index = 0) {



  const title = movie?.title || movie?.name || "Untitled movie";



  const localMovie = movies.find(item => item.title.toLowerCase() === title.toLowerCase());



  if (localMovie) {



    return {



      ...localMovie,



      reason: movie.reason || localMovie.reason,



      matchScore: movie.match_score ?? movie.matchScore ?? null,



    };



  }







  const rawGenre = movie?.genre ?? movie?.genres ?? "Movie";



  const genre = Array.isArray(rawGenre)



    ? rawGenre



    : String(rawGenre).split(/[,|]/).map(value => value.trim()).filter(Boolean);







  return {



    id: movie?.id ?? `api-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,



    title,



    year: Number(movie?.year) || "—",



    rating: Number(movie?.rating ?? movie?.vote_average) || 0,



    genre: genre.length ? genre : ["Movie"],



    runtime: movie?.runtime || "Details unavailable",



    image: movie?.image || movie?.poster || movie?.poster_url || FALLBACK_POSTER,



    backdrop: movie?.backdrop || movie?.backdrop_url || movie?.image || FALLBACK_POSTER,



    description: movie?.description || movie?.overview || "Explore this recommendation from CineFlex.",



    reason: movie?.reason || "Selected by CineFlex based on similar movie themes.",



    matchScore: movie?.match_score ?? movie?.matchScore ?? null,



  };



}







function extractMovieList(data, key) {



  if (Array.isArray(data)) return data;



  if (Array.isArray(data?.[key])) return data[key];



  if (Array.isArray(data?.movies)) return data.movies;



  if (Array.isArray(data?.recommendations)) return data.recommendations;



  if (Array.isArray(data?.results)) return data.results;



  return [];



}







const authInputStyle = {display:"block",boxSizing:"border-box",width:"100%",marginTop:7,padding:"13px 14px",border:"1px solid #34394b",borderRadius:10,background:"#0e111b",color:"white",outline:"none",fontSize:14};







function App() {



  const [authUser, setAuthUser] = useState(() => localStorage.getItem("cineflex_user") || "");



  const [authMode, setAuthMode] = useState("login");



  const [authName, setAuthName] = useState("");



  const [authEmail, setAuthEmail] = useState("");



  const [authPassword, setAuthPassword] = useState("");



  const [authConfirmPassword, setAuthConfirmPassword] = useState("");



  const [showAuthPassword, setShowAuthPassword] = useState(false);



  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const [authError, setAuthError] = useState("");







  const handleAuth = (e) => {



    e.preventDefault();



    setAuthError("");



    const email = authEmail.trim().toLowerCase();



    if (!email || !authPassword) return setAuthError("Please enter your email and password.");



    if (authPassword.length < 6) return setAuthError("Password must be at least 6 characters long.");



    const users = JSON.parse(localStorage.getItem("cineflex_demo_users") || "{}");



    if (authMode === "signup") {



      if (!authName.trim()) return setAuthError("Please enter your full name.");



      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setAuthError("Please enter a valid email address.");



      if (authPassword !== authConfirmPassword) return setAuthError("Passwords do not match.");



      if (users[email]) return setAuthError("An account with this email already exists. Please log in.");



      users[email] = { name: authName.trim(), password: authPassword };



      localStorage.setItem("cineflex_demo_users", JSON.stringify(users));



      localStorage.setItem("cineflex_user", authName.trim());



      setAuthUser(authName.trim());



    } else {



      if (!users[email] || users[email].password !== authPassword) return setAuthError("Incorrect email or password. Please sign up first if you do not have an account.");



      localStorage.setItem("cineflex_user", users[email].name);



      setAuthUser(users[email].name);



    }



  };











  const [activeNav, setActiveNav] = useState("Home");



  const [query, setQuery] = useState("");



  const [aiQuery, setAiQuery] = useState("");



  const [activeGenre, setActiveGenre] = useState("All");



  const [saved, setSaved] = useState([3, 5]);



  const [selected, setSelected] = useState(null);



  const [showAi, setShowAi] = useState(false);



  const [sort, setSort] = useState("Recommended");



  const [mobileMenu, setMobileMenu] = useState(false);



  const [notice, setNotice] = useState("");



  const [apiResults, setApiResults] = useState(null);



  const [loading, setLoading] = useState(false);



  const [tmdbMovies, setTmdbMovies] = useState([]);



  const [trailerVideo, setTrailerVideo] = useState(null);



  const [trailerLoading, setTrailerLoading] = useState(false);



  const [trailerError, setTrailerError] = useState("");

  const [fullMovieOpen, setFullMovieOpen] = useState(false);







  // Load real popular movies from TMDB through the FastAPI backend.



  useEffect(() => {



    let cancelled = false;



    const loadPopularMovies = async () => {



      try {



        const response = await fetch(`${API_URL}/api/tmdb/popular`);



        if (!response.ok) throw new Error(`Popular movies API returned ${response.status}`);



        const data = await response.json();



        const results = extractMovieList(data, "results");



        const realMovies = results.map((movie, index) => {



          const title = movie?.title || movie?.name || "Untitled movie";



          const posterPath = movie?.poster_path || "";



          const backdropPath = movie?.backdrop_path || "";



          const genres = movie?.genre || movie?.genres || ["Movie"];



          return {



            id: movie?.id ?? `tmdb-${index}`,



            isTmdb: true,



            title,



            year: String(movie?.release_date || movie?.first_air_date || "").slice(0, 4) || "—",



            rating: Number(movie?.vote_average ?? movie?.rating) || 0,



            genre: Array.isArray(genres) ? genres : [String(genres)],



            runtime: movie?.runtime ? `${movie.runtime} min` : "Details available on open",



            image: movie?.image || movie?.poster || movie?.poster_url || (posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : FALLBACK_POSTER),



            backdrop: movie?.backdrop || movie?.backdrop_url || (backdropPath ? `https://image.tmdb.org/t/p/w1280${backdropPath}` : FALLBACK_POSTER),



            description: movie?.overview || movie?.description || "Discover this popular movie on TMDB.",



            reason: "Popular on TMDB",



          };



        }).filter(movie => movie.title);



        if (!cancelled && realMovies.length) setTmdbMovies(realMovies);



      } catch (error) {



        console.error("Could not load TMDB popular movies:", error);



        // Keep the existing catalogue visible if the API is temporarily unavailable.



      }



    };



    loadPopularMovies();



    return () => { cancelled = true; };



  }, []);







  const filtered = useMemo(() => {



    let list = [...(activeNav === "Free Movies" ? freeMovies : (tmdbMovies.length ? tmdbMovies : movies))];







    if (activeGenre !== "All") {



      list = list.filter(m => m.genre.includes(activeGenre));



    }







    if (query.trim()) {



      list = list.filter(m =>



        `${m.title} ${m.genre.join(" ")} ${m.year}`



          .toLowerCase()



          .includes(query.toLowerCase())



      );



    }







    if (activeNav === "My List") {



      list = list.filter(m => saved.includes(m.id));



    }







    if (sort === "Top rated") list.sort((a, b) => b.rating - a.rating);



    if (sort === "Newest") list.sort((a, b) => b.year - a.year);







    return list;



  }, [activeGenre, query, activeNav, saved, sort, tmdbMovies]);







  const displayedMovies = apiResults !== null ? apiResults : filtered;







  const clearApiResults = () => setApiResults(null);







  const toggleSave = id => {



    setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);



    setNotice(saved.includes(id) ? "Removed from your list" : "Added to your list");



    setTimeout(() => setNotice(""), 1800);



  };







  const submitAI = async e => {



    e.preventDefault();







    const prompt = aiQuery.trim();



    if (!prompt || loading) return;







    setLoading(true);



    setNotice("");







    try {



      const lowerPrompt = prompt.toLowerCase();



      const matchedMovie = movies.find(movie =>



        lowerPrompt.includes(movie.title.toLowerCase())



      );







      let response;



      let data;



      let results = [];







      if (matchedMovie) {



        const url = `${API_URL}/api/recommendations?title=${encodeURIComponent(matchedMovie.title)}&limit=10`;



        response = await fetch(url);



        if (!response.ok) throw new Error(`Recommendation API returned ${response.status}`);



        data = await response.json();







        // The current backend returns a JSON array; support wrapped responses too.



        results = extractMovieList(data, "recommendations")



          .map((movie, index) => normalizeApiMovie(movie, index))



          .filter(movie => movie.title.toLowerCase() !== matchedMovie.title.toLowerCase());







        setApiResults(results);



        setNotice(results.length



          ? `Recommendations for ${matchedMovie.title}`



          : `The API responded, but returned no recommendations for ${matchedMovie.title}.`);



      } else {



        const genreKeywords = [



          ["sci-fi", "Sci-Fi"], ["science fiction", "Sci-Fi"], ["space", "Sci-Fi"],



          ["thriller", "Thriller"], ["mystery", "Thriller"], ["suspense", "Thriller"],



          ["action", "Action"], ["romance", "Romance"], ["love story", "Romance"],



          ["romantic", "Romance"], ["drama", "Drama"], ["comedy", "Comedy"],



          ["funny", "Comedy"], ["animation", "Animation"], ["animated", "Animation"],



          ["adventure", "Adventure"]



        ];







        const matchedGenre = genreKeywords.find(([keyword]) => lowerPrompt.includes(keyword))?.[1];



        if (!matchedGenre) {



          setNotice("Try a movie title or a mood/genre such as sci-fi, thriller, romance, action, comedy or drama.");



          return;



        }







        response = await fetch(`${API_URL}/api/movies?genre=${encodeURIComponent(matchedGenre)}`);



        if (!response.ok) throw new Error(`Movies API returned ${response.status}`);



        data = await response.json();







        results = extractMovieList(data, "movies").map((movie, index) => normalizeApiMovie(movie, index));



        setApiResults(results);



        setNotice(results.length



          ? `CineFlex found ${results.length} ${matchedGenre} movies`



          : `No ${matchedGenre} movies were returned by the backend.`);



      }







      setQuery("");



      setActiveGenre("All");



      setActiveNav("Discover");



      setShowAi(false);



    } catch (error) {



      console.error("CineFlex API error:", error);



      setNotice("Could not connect to the backend. Check that the API is running at http://127.0.0.1:8000 and try again.");



    } finally {



      setLoading(false);



    }



  };







  const playTrailer = async () => {



    if (!selected) return;



    setTrailerVideo(null);



    setTrailerError("");



    setTrailerLoading(true);



    try {



      let movieId = selected.isTmdb ? selected.id : null;



      // Local/demo catalogue entries do not carry TMDB IDs, so search TMDB by title first.



      if (!movieId || String(movieId).startsWith("api-")) {



        const searchResponse = await fetch(`${API_URL}/api/tmdb/search?q=${encodeURIComponent(selected.title)}`);



        if (!searchResponse.ok) throw new Error("Could not search TMDB for this movie.");



        const searchData = await searchResponse.json();



        const matches = extractMovieList(searchData, "results");



        movieId = matches[0]?.id;



      }



      if (!movieId) throw new Error("No TMDB match was found for this movie.");



      const videoResponse = await fetch(`${API_URL}/api/tmdb/movies/${movieId}/videos`);



      if (!videoResponse.ok) throw new Error("Could not load the trailer right now.");



      const videoData = await videoResponse.json();



      const videos = extractMovieList(videoData, "results");



      const trailer = videos.find(video => video.site === "YouTube" && video.type === "Trailer")



        || videos.find(video => video.site === "YouTube" && /trailer/i.test(video.name || ""))



        || videos.find(video => video.site === "YouTube");



      if (!trailer?.key) throw new Error("No YouTube trailer is available in TMDB for this movie.");



      setTrailerVideo({ key: trailer.key, name: trailer.name || `${selected.title} Trailer` });



    } catch (error) {



      setTrailerError(error.message || "Could not load trailer. Please try again.");



    } finally {



      setTrailerLoading(false);



    }



  };







  if (!authUser) return (



    <main style={{



      minHeight: "100vh", boxSizing: "border-box", display: "flex", alignItems: "center",



      justifyContent: "center", padding: "28px 16px",



      background: "radial-gradient(ellipse at 50% 0%, #29234c 0%, #10121d 48%, #090b12 100%)",



      color: "#f8fafc", fontFamily: "Inter, system-ui, sans-serif"



    }}>



      <section style={{



        width: "100%", maxWidth: 440, boxSizing: "border-box", padding: "clamp(24px, 5vw, 36px)",



        border: "1px solid rgba(255,255,255,.12)", borderRadius: 24,



        background: "rgba(21,24,36,.96)", boxShadow: "0 24px 80px rgba(0,0,0,.4)"



      }}>



        <div className="auth-brand-logo-wrap">



          <img className="auth-brand-logo" src="/cineflex-logo.png" alt="CineFlex — Your Personal Cinema" />



        </div>



        <h1 style={{fontSize:30,lineHeight:1.2,letterSpacing:"-.7px",margin:"0 0 9px",fontWeight:800}}>



          {authMode === "login" ? "Welcome back" : "Create your account"}



        </h1>



        <p style={{color:"#a7adbd",fontSize:14,margin:"0 0 26px",lineHeight:1.6}}>



          {authMode === "login"



            ? "Sign in to continue discovering your next favorite movie."



            : "Join CineFlex to build your personal movie watchlist."}



        </p>







        <form onSubmit={handleAuth}>



          {authMode === "signup" && (



            <label style={{display:"block",fontSize:13,fontWeight:600,color:"#e2e8f0",marginBottom:16}}>



              Full name



              <input required value={authName} onChange={e=>setAuthName(e.target.value)}



                placeholder="Enter your full name" autoComplete="name"



                style={authInputStyle}/>



            </label>



          )}







          <label style={{display:"block",fontSize:13,fontWeight:600,color:"#e2e8f0",marginBottom:16}}>



            Email address



            <input required type="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)}



              placeholder="you@example.com" autoComplete="email"



              style={authInputStyle}/>



          </label>







          <label style={{display:"block",fontSize:13,fontWeight:600,color:"#e2e8f0",marginBottom:16}}>



            Password



            <span style={{position:"relative",display:"block",marginTop:7}}>



              <input required type={showAuthPassword ? "text" : "password"} value={authPassword}



                onChange={e=>setAuthPassword(e.target.value)}



                placeholder="At least 6 characters"



                autoComplete={authMode === "login" ? "current-password" : "new-password"}



                style={{...authInputStyle,marginTop:0,paddingRight:48}}/>



              <button type="button" aria-label={showAuthPassword ? "Hide password" : "Show password"}



                title={showAuthPassword ? "Hide password" : "Show password"}



                onClick={()=>setShowAuthPassword(v=>!v)}



                style={{position:"absolute",right:7,top:"50%",transform:"translateY(-50%)",width:34,height:34,



                  display:"grid",placeItems:"center",border:0,borderRadius:7,background:"transparent",



                  color:"#a7adbd",cursor:"pointer"}}>



                {showAuthPassword ? <EyeOff size={18}/> : <Eye size={18}/>}



              </button>



            </span>



          </label>







          {authMode === "signup" && (



            <label style={{display:"block",fontSize:13,fontWeight:600,color:"#e2e8f0",marginBottom:16}}>



              Confirm password



              <span style={{position:"relative",display:"block",marginTop:7}}>



                <input required type={showConfirmPassword ? "text" : "password"} value={authConfirmPassword}



                  onChange={e=>setAuthConfirmPassword(e.target.value)}



                  placeholder="Re-enter your password" autoComplete="new-password"



                  style={{...authInputStyle,marginTop:0,paddingRight:48}}/>



                <button type="button" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}



                  title={showConfirmPassword ? "Hide password" : "Show password"}



                  onClick={()=>setShowConfirmPassword(v=>!v)}



                  style={{position:"absolute",right:7,top:"50%",transform:"translateY(-50%)",width:34,height:34,



                    display:"grid",placeItems:"center",border:0,borderRadius:7,background:"transparent",



                    color:"#a7adbd",cursor:"pointer"}}>



                  {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}



                </button>



              </span>



            </label>



          )}







          {authError && (



            <p role="alert" style={{color:"#fda4af",fontSize:13,margin:"0 0 14px",lineHeight:1.5}}>



              {authError}



            </p>



          )}







          <button type="submit" style={{



            width:"100%", marginTop:5, padding:"14px 16px", border:0, borderRadius:12,



            color:"#fff", fontWeight:800, fontSize:15, cursor:"pointer",



            background:"linear-gradient(100deg,#7c3aed,#db2777)",



            boxShadow:"0 8px 24px rgba(124,58,237,.22)"



          }}>



            {authMode === "login" ? "Sign in" : "Create account"}



          </button>



        </form>







        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:6,flexWrap:"wrap",fontSize:14,color:"#a7adbd",margin:"23px 0 0"}}>



          <span>{authMode === "login" ? "Don't have an account?" : "Already have an account?"}</span>



          <button type="button" onClick={()=>{



            setAuthMode(authMode === "login" ? "signup" : "login");



            setAuthError("");



            setAuthPassword("");



            setAuthConfirmPassword("");



          }} style={{background:"none",border:0,padding:3,color:"#c4b5fd",fontWeight:800,cursor:"pointer",fontSize:14}}>



            {authMode === "login" ? "Create account" : "Sign in"}



          </button>



        </div>







        <p style={{fontSize:11,color:"#7f879a",lineHeight:1.6,margin:"24px 0 0",textAlign:"center"}}>



          Demo version: account data is stored only in this browser. Do not use a real password.



        </p>



      </section>



    </main>



  );







  return (



    <div className="app-shell">



      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>



        <button className="brand" onClick={() => {



          setActiveNav("Home");



          setMobileMenu(false);



          clearApiResults();



        }}>



          <img className="sidebar-brand-logo" src="/cineflex-logo.png" alt="CineFlex" />



        </button>







        <div className="side-label">MENU</div>



        <nav className="side-nav">



          {navItems.map(({ label, icon: Icon }) => (



            <button



              key={label}



              className={`nav-item ${activeNav === label ? "active" : ""}`}



              onClick={() => {



                setActiveNav(label);
                setQuery("");
                setActiveGenre("All");



                setMobileMenu(false);



                clearApiResults();



              }}



            >



              <Icon size={18} />



              <span>{label}</span>



              {label === "My List" && <span className="nav-count">{saved.length}</span>}



            </button>



          ))}



        </nav>







        <div className="side-label collections-label">YOUR VIBE</div>



        <button className="vibe-card" onClick={() => {



          setShowAi(true);



          setMobileMenu(false);



        }}>



          <span className="vibe-icon"><WandSparkles size={17} /></span>



          <strong>Find your next favorite</strong>



          <span>Tell us the mood. We'll find the movie.</span>



          <span className="vibe-link">Try AI search <ArrowUpRight size={13} /></span>



        </button>







        <div className="sidebar-bottom">



          <div className="avatar">P</div>



          <div className="user-meta">



            <strong>{authUser || "Movie Explorer"}</strong>



            <span>Demo account</span>



          </div>



          <button className="icon-button tiny"><UserRound size={16} /></button>



        </div>



      </aside>







      <main className="main-area">



        <header className="topbar">



          <button className="icon-button menu-trigger" onClick={() => setMobileMenu(!mobileMenu)}>



            <Menu size={20} />



          </button>







          <div className="breadcrumb">



            <span>Workspace</span>



            <ChevronRight size={14} />



            <strong>{activeNav}</strong>



          </div>







          <form className="search-box" onSubmit={e => e.preventDefault()}>



            <Search size={17} />



            <input



              value={query}



              onChange={e => {



                setQuery(e.target.value);



                clearApiResults();



              }}



              placeholder="Search movies, genres, years..."



              aria-label="Search movies"



            />



            {query && (



              <button type="button" className="clear-search" onClick={() => setQuery("")}>



                <X size={14} />



              </button>



            )}



            <kbd>⌘ K</kbd>



          </form>







          <button className="icon-button notification" aria-label="Notifications">



            <Bell size={18} /><i />



          </button>



          <button className="profile-avatar" title="Logout" onClick={() => { localStorage.removeItem("cineflex_user"); setAuthUser(""); setAuthEmail(""); setAuthPassword(""); }}> {authUser?.[0]?.toUpperCase() || "P"}</button>



        </header>







        <div className="page-content">



          {activeNav === "Home" && !query && apiResults === null && (



            <section className="hero">



              <img className="hero-image" src="https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg" alt="Cinematic sci-fi landscape" />



              <div className="hero-overlay" />



              <div className="hero-content">



                <div className="eyebrow"><Sparkles size={13} /> YOUR PERSONAL CINEMA</div>



                <h1>Stories you'll love.<br /><em>Before you even know it.</em></h1>



                <p>Your taste is unique. Your recommendations should be too. Discover films picked for you by CineFlex.</p>



                <div className="hero-actions">



                  <button className="primary-button" onClick={() => {



                    setActiveNav("Discover");



                    setActiveGenre("All");



                    clearApiResults();



                  }}>



                    <Compass size={16} /> Explore movies <ChevronRight size={16} />



                  </button>



                  <button className="glass-button" onClick={() => setShowAi(true)}>



                    <Sparkles size={15} /> Ask AI



                  </button>



                </div>



                <div className="hero-proof">



                  <div className="avatar-stack"><span>J</span><span>A</span><span>M</span><span>+</span></div>



                  <span><strong>Made for your taste</strong><br />Not just what's trending</span>



                </div>



              </div>



              <div className="hero-floating">



                <span className="floating-star"><Star size={14} fill="currentColor" /></span>



                <div><strong>Personalized picks</strong><span>Made around your taste</span></div>



              </div>



              <div className="hero-pagination"><i className="current" /><i /><i /></div>



            </section>



          )}







          <section className="section-block">



            <div className="section-heading">



              <div>



                <div className="eyebrow muted-eyebrow">



                  {activeNav === "Free Movies" ? "OPENLY LICENSED FILMS" : activeNav === "My List" ? "SAVED FOR LATER" : activeNav === "Discover" ? "YOUR NEXT OBSESSION" : "CURATED FOR YOU"}



                </div>



                <h2>



                  {apiResults !== null



                    ? "CineFlex recommendations"



                    : activeNav === "My List"



                      ? "Your watchlist"



                      : query



                        ? "Search results"



                        : activeNav === "Free Movies"



                          ? "Free movies to watch"



                          : activeNav === "Discover"



                          ? "Discover something new"



                          : "Picked for your taste"}



                  <span className="heading-spark">✦</span>



                </h2>



                <p>



                  {apiResults !== null



                    ? "Results returned by your CineFlex recommendation engine."



                    : activeNav === "Free Movies"



                      ? "Watch openly licensed films right here in CineFlex."



                      : activeNav === "My List"



                      ? "All the films you've saved in one place."



                      : "Thoughtful picks, unexpected gems, and stories worth your time."}



                </p>



              </div>







              <div className="section-controls">



                <label className="sort-control">



                  <SlidersHorizontal size={15} />



                  <select value={sort} onChange={e => setSort(e.target.value)}>



                    <option>Recommended</option>



                    <option>Top rated</option>



                    <option>Newest</option>



                  </select>



                  <ChevronDown size={13} />



                </label>



                <button className="text-button" onClick={() => {



                  setActiveNav("Discover");



                  setActiveGenre("All");



                  clearApiResults();



                }}>



                  View all <ChevronRight size={15} />



                </button>



              </div>



            </div>







            <div className="genre-row">



              {genres.map(g => (



                <button



                  key={g}



                  onClick={() => {



                    setActiveGenre(g);



                    setActiveNav(g === "All" ? "Discover" : "Discover");



                    clearApiResults();



                  }}



                  className={`genre-chip ${activeGenre === g ? "selected" : ""}`}



                >



                  {g === "All" ? <Flame size={13} /> : null}



                  {g}



                </button>



              ))}



              <button className="ai-chip" onClick={() => setShowAi(true)}>



                <Sparkles size={14} /> Describe a mood



              </button>



            </div>







            {loading && (



              <div className="empty-state">



                <Sparkles size={30} />



                <h3>Finding your movies...</h3>



                <p>CineFlex is contacting the recommendation API.</p>



              </div>



            )}







            {!loading && displayedMovies.length > 0 && (



              <div className="movie-grid">



                {displayedMovies.map((movie, index) => (



                  <MovieCard



                    key={movie.id}



                    movie={movie}



                    saved={saved.includes(movie.id)}



                    onSave={() => toggleSave(movie.id)}



                    onOpen={() => { setSelected(movie); setFullMovieOpen(false); }}



                    index={index}



                  />



                ))}



              </div>



            )}







            {!loading && displayedMovies.length === 0 && (



              <div className="empty-state">



                <Film size={30} />



                <h3>No movies found</h3>



                <p>



                  {apiResults !== null



                    ? "The backend results did not match movies in the current frontend catalogue. Try another movie or genre."



                    : "Try another title or clear your filters."}



                </p>



                <button className="primary-button" onClick={() => {



                  setQuery("");



                  setActiveGenre("All");



                  setActiveNav("Discover");



                  clearApiResults();



                }}>



                  Reset filters <RotateCcw size={15} />



                </button>



              </div>



            )}



          </section>







          <section className="insight-banner">



            <div className="insight-icon"><Sparkles size={21} /></div>



            <div className="insight-copy">



              <span className="eyebrow">A LITTLE MOVIE MAGIC</span>



              <h3>Can't decide what to watch?</h3>



              <p>Describe your perfect movie night and let your AI discovery assistant do the digging.</p>



            </div>



            <button className="primary-button" onClick={() => setShowAi(true)}>



              Find my movie <ArrowUpRight size={15} />



            </button>



            <div className="banner-orb orb-one" />



            <div className="banner-orb orb-two" />



          </section>







          <footer className="footer">



            <span className="footer-brand"><img className="footer-brand-logo" src="/cineflex-logo.png" alt="CineFlex" /></span>



            <span>Made for curious movie lovers.</span>



            <span className="footer-right">Discover better. Watch happier. <Heart size={12} fill="currentColor" /></span>



          </footer>



        </div>



      </main>







      {showAi && (



        <div className="modal-backdrop" onClick={() => !loading && setShowAi(false)}>



          <div className="ai-modal" onClick={e => e.stopPropagation()}>



            <button className="modal-close" onClick={() => setShowAi(false)} disabled={loading}>



              <X size={18} />



            </button>



            <div className="ai-modal-icon"><Sparkles size={24} /></div>



            <div className="eyebrow">CINEFLEX AI ASSISTANT</div>



            <h2>Your mood. Your movie.</h2>



            <p>Tell us what you're in the mood for. Be as specific or as unexpected as you like.</p>







            <form onSubmit={submitAI}>



              <div className="ai-input-wrap">



                <WandSparkles size={18} />



                <input



                  autoFocus



                  value={aiQuery}



                  onChange={e => setAiQuery(e.target.value)}



                  placeholder="e.g. Inception, sci-fi, thriller..."



                />



              </div>







              <div className="prompt-suggestions">



                <span>TRY:</span>



                {["Inception", "A clever thriller", "Epic space adventure"].map(s => (



                  <button type="button" key={s} onClick={() => setAiQuery(s)}>{s}</button>



                ))}



              </div>







              <button className="primary-button ai-submit" type="submit" disabled={loading}>



                {loading ? "Finding movies..." : "Find my perfect movie"}



                <Sparkles size={15} />



              </button>



            </form>







            <div className="modal-note">



              <span className="status-dot" />



              {loading ? "Contacting CineFlex recommendation engine..." : "Connected to your local recommendation API"}



            </div>



          </div>



        </div>



      )}







      {selected && (



        <div className="modal-backdrop" onClick={() => { setSelected(null); setFullMovieOpen(false); }}>



          <div className="movie-modal" onClick={e => e.stopPropagation()}>



            <div



              className="detail-backdrop"



              style={{



                backgroundImage: `linear-gradient(0deg,#0b0e16 0%,rgba(11,14,22,.3) 100%),url(${selected.backdrop})`



              }}



            />



            <button className="modal-close" onClick={() => { setSelected(null); setFullMovieOpen(false); }}>



              <X size={18} />



            </button>



            <div className="detail-body">



              <div className="detail-poster">



                <img src={selected.image} alt={`${selected.title} poster`} />



              </div>



              <div className="detail-info">



                <div className="eyebrow"><Sparkles size={13} /> YOUR MATCH</div>



                <h2>{selected.title}</h2>



                <div className="detail-meta">



                  <span>{selected.year}</span>



                  <i />



                  <span>{selected.runtime}</span>



                  <i />



                  <span className="rating"><Star size={14} fill="currentColor" />{selected.rating}</span>



                </div>



                <div className="detail-genres">



                  {selected.genre.map(g => <span key={g}>{g}</span>)}



                </div>



                <p>{selected.description}</p>



                <div className="why-match">



                  <Sparkles size={16} />



                  <span><strong>Why you'll like it</strong>{selected.reason}</span>



                </div>



                <div className="detail-actions">



                  {selected.isFreeMovie && (

                    <button className="primary-button" onClick={() => setFullMovieOpen(true)}><Play size={15} /> Watch full movie</button>

                  )}

                  <button className="primary-button" onClick={() => toggleSave(selected.id)}>



                    {saved.includes(selected.id) ? <Check size={16} /> : <Plus size={16} />}



                    {saved.includes(selected.id) ? "In your list" : "Add to watchlist"}



                  </button>



                  <button className="glass-button" onClick={playTrailer} disabled={trailerLoading}>



                    <Play size={15} /> {trailerLoading ? "Loading trailer..." : "Watch trailer"}



                  </button>



                </div>



                {selected.isFreeMovie && fullMovieOpen && (

                  <div style={{marginTop:22}}>

                    <h3 style={{fontSize:16,margin:"0 0 10px",color:"#f8fafc"}}>Now playing: {selected.title}</h3>

                    <div style={{position:"relative",width:"100%",aspectRatio:"16 / 9",overflow:"hidden",borderRadius:12,background:"#05070b",border:"1px solid rgba(255,255,255,.12)"}}>

                      <iframe

                        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(selected.videoKey)}?autoplay=1&rel=0`}

                        title={`${selected.title} full movie`}

                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

                        referrerPolicy="strict-origin-when-cross-origin"

                        allowFullScreen

                        style={{position:"absolute",inset:0,width:"100%",height:"100%",border:0}}

                      />

                    </div>

                    <p style={{color:"#a7adbd",fontSize:12,lineHeight:1.5,marginTop:9}}>{selected.attribution}. Playback is provided by the original publisher.</p>

                  </div>

                )}

                {(trailerLoading || trailerError || trailerVideo) && (



                  <div style={{marginTop:22}}>



                    {trailerLoading && <p style={{color:"#b8bfd0",fontSize:14}}>Finding the official YouTube trailer...</p>}



                    {trailerError && (



                      <div role="alert" style={{margin:"12px 0"}}>



                        <p style={{color:"#fda4af",fontSize:13,margin:"0 0 12px",lineHeight:1.6}}>{trailerError}</p>



                        <a



                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${selected.title} ${selected.year !== "—" ? selected.year : ""} official trailer`)}`}



                          target="\\_blank"



                          rel="noopener noreferrer"



                          style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 13px",borderRadius:10,border:"1px solid #45415e",background:"#171827",color:"#d8ccff",fontSize:13,fontWeight:700,textDecoration:"none"}}



                        >



                          <Play size={14} /> Search trailer on YouTube <ArrowUpRight size={14} />



                        </a>



                      </div>



                    )}



                    {trailerVideo && (



                      <div>



                        <h3 style={{fontSize:15,margin:"0 0 10px",color:"#f8fafc"}}>{trailerVideo.name}</h3>



                        <div style={{position:"relative",width:"100%",aspectRatio:"16 / 9",overflow:"hidden",borderRadius:12,background:"#05070b",border:"1px solid rgba(255,255,255,.12)"}}>



                          <iframe



                            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailerVideo.key)}?autoplay=0&rel=0`}



                            title={`${selected.title} YouTube trailer`}



                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"



                            referrerPolicy="strict-origin-when-cross-origin"



                            allowFullScreen



                            style={{position:"absolute",inset:0,width:"100%",height:"100%",border:0}}



                          />



                        </div>



                      </div>



                    )}



                  </div>



                )}



              </div>



            </div>



          </div>



        </div>



      )}







      {notice && (



        <div className="toast">



          <Check size={16} /> {notice}



        </div>



      )}



    </div>



  );



}







function MovieCard({ movie, saved, onSave, onOpen, index }) {



  return (



    <article className="movie-card" style={{ animationDelay: `${index * 45}ms` }}>



      <button className="poster-button" onClick={onOpen} aria-label={`View ${movie.title} details`}>



        <img className="movie-poster" src={movie.image} alt={`${movie.title} poster`} loading="lazy" />



        <span className="poster-shade" />



        <span className="poster-play"><Play size={18} fill="currentColor" /></span>



        <span className="match-badge"><Sparkles size={10} /> FOR YOU</span>



      </button>







      <button



        className={`save-button ${saved ? "is-saved" : ""}`}



        onClick={onSave}



        title={saved ? "Remove from watchlist" : "Add to watchlist"}



      >



        {saved ? <Check size={15} /> : <Plus size={15} />}



      </button>







      <div className="movie-info">



        <button className="movie-title" onClick={onOpen}>{movie.title}</button>



        <div className="movie-subline">



          <span>{movie.year}</span>



          <span className="dot-sep">·</span>



          <span>{movie.genre[0]}</span>



          <span className="rating"><Star size={12} fill="currentColor" />{movie.rating}</span>



        </div>



        <div className="match-line">



          <span className="match-bar"><i style={{ width: `${movie.matchScore != null ? Math.max(0, Math.min(100, Number(movie.matchScore) * 100)) : 83 + (Number(movie.id) % 4) * 4}%` }} /></span>



          <span>{movie.matchScore != null ? `${Math.round(Math.max(0, Math.min(1, Number(movie.matchScore))) * 100)}% match` : `${83 + ((Number(movie.id) || 1) % 4) * 4}% match`}</span>



        </div>



      </div>



    </article>



  );



}







createRoot(document.getElementById("root")).render(



  <React.StrictMode>



    <App />



  </React.StrictMode>



);
